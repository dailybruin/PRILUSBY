const { createHash } = require('crypto')
const fetch = require('node-fetch').default
const path = require(`path`)

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions
  // === GET MAP OF ARTICLES TO ISSUES (Kerckhoff for old issues, Oink for spring26+)
  const mapURL =
    'https://kerckhoff.dailybruin.com/api/packages/prime/prime.map.articles.to.issues/'
  const mapResponse = await fetch(mapURL)
  const mapJson = await mapResponse.json()
  const oinkMapURL =
    'https://oink.dailybruin.com/api/packages/prime/prime.map.articles.to.issues'
  const oinkMapResponse = await fetch(oinkMapURL)
  const oinkMapJson = await oinkMapResponse.json()
  const kerckhoffIssues = mapJson.data['map.aml'].issues
  const oinkIssues = oinkMapJson.data['map.aml'].issues
  const allIssues = [...kerckhoffIssues, ...oinkIssues]
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
    // === GET ALL THE ARTICLES
    // Use each map to know which slugs belong to which source, then filter accordingly
    const kerckhoffSlugs = new Set(kerckhoffIssues.flatMap(i => i.articles))
    const oinkSlugs = new Set(oinkIssues.flatMap(i => i.articles))
    const kerckhoffRes = await fetch(`https://kerckhoff.dailybruin.com/api/packages/prime?all=True`)
    const kerckhoffJson = await kerckhoffRes.json()
    const oinkRes = await fetch(`https://oink.dailybruin.com/api/packages/prime?all=True`)
    const oinkJson = await oinkRes.json()
    const data = {
      ...Object.fromEntries(Object.entries(kerckhoffJson.data).filter(([, v]) => kerckhoffSlugs.has(v.slug))),
      ...Object.fromEntries(Object.entries(oinkJson.data).filter(([, v]) => oinkSlugs.has(v.slug))),
    }
    Object.keys(data).forEach(key => {
      let article = data[key].data['article.aml']
      let slug = data[key].slug
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
  const mapURL =
    'https://kerckhoff.dailybruin.com/api/packages/prime/prime.map.articles.to.issues/'
  const mapResponse = await fetch(mapURL)
  const mapJson = await mapResponse.json()
  const oinkMapURL =
    'https://oink.dailybruin.com/api/packages/prime/prime.map.articles.to.issues'
  const oinkMapResponse = await fetch(oinkMapURL)
  const oinkMapJson = await oinkMapResponse.json()
  const kerckhoffIssues = mapJson.data['map.aml'].issues
  const oinkIssues = oinkMapJson.data['map.aml'].issues
  const termToNumber = (term) => {
    const [season, year] = [term.slice(0, -2), term.slice(-2)]
    const seasonOrder = { winter: 0, spring: 1, summer: 2, fall: 3 }
    return parseInt(year) * 10 + seasonOrder[season]
  }
  const useOink = (term) => termToNumber(term) >= termToNumber('winter26')
  kerckhoffIssues.forEach(issue => {
    if (useOink(issue.term)) {
      return
    }

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
    })
  })
  oinkIssues.forEach(issue => {
    if (!useOink(issue.term)) {
      return
    }

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
