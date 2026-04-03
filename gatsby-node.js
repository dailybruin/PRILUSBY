const { createHash } = require('crypto')
const fetch = require('node-fetch').default
const path = require(`path`)

const KERCKHOFF_BASE = 'https://kerckhoff.dailybruin.com/api/packages/prime'
const OINK_BASE = 'https://oink.dailybruin.com/api/packages/prime'

// Fetch the articles-to-issues map from a given base URL.
// Returns the issues array, or [] if the request fails.
async function fetchIssueMap(baseUrl) {
  try {
    const response = await fetch(
      `${baseUrl}/prime.map.articles.to.issues/`
    )
    const json = await response.json()
    return json.data['map.aml'].issues || []
  } catch (e) {
    console.warn(`[prime] Could not fetch issue map from ${baseUrl}:`, e.message)
    return []
  }
}

// Fetch all article packages from a given base URL.
// Returns the data object keyed by package slug, or {} if the request fails.
async function fetchAllArticles(baseUrl) {
  try {
    const response = await fetch(`${baseUrl}?all=True`)
    const json = await response.json()
    return json.data || {}
  } catch (e) {
    console.warn(`[prime] Could not fetch articles from ${baseUrl}:`, e.message)
    return {}
  }
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  // === GET MAP OF ARTICLES TO ISSUES (both sources)
  const [kerckhoffIssues, oinkIssues] = await Promise.all([
    fetchIssueMap(KERCKHOFF_BASE),
    fetchIssueMap(OINK_BASE),
  ])
  // Merge issues; Oink entries override Kerckhoff entries for the same term
  const issuesByTerm = {}
  ;[...kerckhoffIssues, ...oinkIssues].forEach(issue => {
    issuesByTerm[issue.term] = issue
  })
  const allIssues = Object.values(issuesByTerm)

  createNode({
    issues: allIssues,
    children: [],
    id: createNodeId(`kerck-issues`),
    internal: {
      content: JSON.stringify(allIssues),
      contentDigest: createHash('md5')
        .update(JSON.stringify(allIssues))
        .digest('hex'),
      type: 'Issues',
    },
    parent: null,
  })
  allIssues.forEach((issue, i) => {
    createNode({
      ...issue,
      term: issue.term,
      children: [],
      id: createNodeId(`kerck-issue-${issue.term}`),
      internal: {
        content: JSON.stringify(issue),
        contentDigest: createHash('md5')
          .update(JSON.stringify(issue))
          .digest('hex'),
        type: 'Issue',
      },
      parent: null,
    })
  })

  {
    // === GET ALL THE ARTICLES (both sources)
    const [kerckhoffData, oinkData] = await Promise.all([
      fetchAllArticles(KERCKHOFF_BASE),
      fetchAllArticles(OINK_BASE),
    ])
    // Merge article data; Oink entries override Kerckhoff entries for the same key
    const allData = { ...kerckhoffData, ...oinkData }

    Object.keys(allData).forEach(key => {
      let article = allData[key].data['article.aml']
      let slug = allData[key].slug
      if (!article || !slug) {
        return
      }

      // If the AML property is capitalized as "Coverimg", copy it to lowercase "coverimg"
      if (!article.coverimg && article.Coverimg) {
        article.coverimg = article.Coverimg
      }

      let content
      if (article.hasOwnProperty('content') && Array.isArray(article.content)) {
        content = article.content.map(element => {
          if (typeof element.value !== 'string') {
            element.value = JSON.stringify(element.value)
          }
          return element
        })
      }
      createNode({
        ...article,
        slug,
        children: [],
        content,
        id: createNodeId(`prime-${slug}`),
        internal: {
          content: JSON.stringify(article),
          contentDigest: createHash('md5')
            .update(JSON.stringify(article))
            .digest('hex'),
          type: 'PrimeArticle',
        },
        parent: null,
      })
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const { createPage } = actions

  // Fetch issue map from both sources and merge (same logic as sourceNodes)
  const [kerckhoffIssues, oinkIssues] = await Promise.all([
    fetchIssueMap(KERCKHOFF_BASE),
    fetchIssueMap(OINK_BASE),
  ])
  const issuesByTerm = {}
  ;[...kerckhoffIssues, ...oinkIssues].forEach(issue => {
    issuesByTerm[issue.term] = issue
  })
  const allIssues = Object.values(issuesByTerm)

  allIssues.forEach(issue => {
    return graphql(`
      {
        issue(term: {eq: "${issue.term}"}) {
          term
          title
          coverphoto
          articles
        }
      }
    `).then(_ => {
      createPage({
        path: `${issue.term}`,
        component: path.resolve(`./src/templates/issue.tsx`),
        context: {
          term: issue.term,
          articles: issue.articles,
          coverphoto: issue.coverphoto,
          title: issue.title,
        },
      })
      issue.articles.forEach(articleslug => {
        return graphql(`
      {
        primeArticle(slug: {eq: "${articleslug}"}) {
          slug
          headline
          author
          authorbio
          authoremail
          authortwitter
          coverimg
          covercred
          coveralt
          articleType
          excerpt
          updated
          content {
            type
            value
          }
        }
      }
    `).then(_ => {
          createPage({
            path: `${articleslug.split('.').join('')}`,
            component: path.resolve(`./src/templates/article.tsx`),
            context: {
              term: issue.term,
              slug: articleslug,
            },
          })
        })
      })
      // i have a final tomorrow sue me
      // (FIX BELOWWW)
      const registrationissue2019 = [
        'prime.regissue.toptenprofessors',
        'prime.regissue.studyspace',
      ]
      registrationissue2019.forEach(articleslug => {
        return graphql(`{
          primeArticle(slug: {eq: "${articleslug}"}) {
            slug
            headline
            author
            authorbio
            authoremail
            authortwitter
            coverimg
            covercred
            coveralt
            articleType
            excerpt
            content {
              type
              value
            }
          }
        }`).then(_ => {
          createPage({
            path: `${articleslug.split('.').join('')}`,
            component: path.resolve(`./src/templates/article.tsx`),
            context: {
              term: 'Registration Issue19',
              slug: articleslug,
            },
          })
        })
      })
      const orientationissue2019 = ['prime.orientationissue.stories']
      orientationissue2019.forEach(articleslug => {
        return graphql(`{
          primeArticle(slug: {eq: "${articleslug}"}) {
            slug
            headline
            author
            authorbio
            authoremail
            authortwitter
            coverimg
            covercred
            coveralt
            articleType
            excerpt
            content {
              type
              value
            }
          }
        }`).then(_ => {
          createPage({
            path: `${articleslug.split('.').join('')}`,
            component: path.resolve(`./src/templates/article.tsx`),
            context: {
              term: 'Orientation Issue19',
              slug: articleslug,
            },
          })
        })
      })
      const gradissue2019 = [
        'prime.gradissue.visa',
        'prime.gradissue.evolutionofphotos',
      ]
      gradissue2019.forEach(articleslug => {
        return graphql(`
      {
        primeArticle(slug: {eq: "${articleslug}"}) {
          slug
          headline
          author
          authorbio
          authoremail
          authortwitter
          coverimg
          covercred
          coveralt
          articleType
          excerpt
          content {
            type
            value
          }
        }
      }
    `).then(_ => {
          createPage({
            path: `${articleslug.split('.').join('')}`,
            component: path.resolve(`./src/templates/article.tsx`),
            context: {
              term: 'Grad Issue19',
              slug: articleslug,
            },
          })
        })
      })
    })
  })
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          lux: require.resolve('@dailybruin/lux'),
        },
      },
    })
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /lux/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
