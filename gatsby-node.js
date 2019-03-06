const { createHash } = require('crypto')
const fetch = require('node-fetch').default
const path = require(`path`)

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions
  // === GET MAP OF ARTICLES TO ISSUES
  const mapURL =
    'https://kerckhoff.dailybruin.com/api/packages/prime/prime.map.articles.to.issues/'
  const mapResponse = await fetch(mapURL)
  const mapJson = await mapResponse.json()
  const { data } = mapJson
  data['map.aml'].issues.forEach((issue, i) => {
    createNode({
      ...issue,
      term: issue.term,
      children: [],
      id: createNodeId(`kerck-issue-${i}`),
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

  // === GET ALL THE ARTICLES
  for (let i = 1; i <= 6; i++) {
    const url = `https://kerckhoff.dailybruin.com/api/packages/prime?page=${i}`
    const response = await fetch(url)
    const json = await response.json()
    const { slug, data, description } = json

    // Each article name is given as a key on in the JSON data, e.g., `"article.aml": {...}`
    Object.keys(data).forEach(key => {
      const article = data[key].data['article.aml']
      const slug = data[key].slug
      if (!article) return
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
        title: article.headline,
        ...article,
        slug,
        children: [],
        content,
        id: createNodeId(`prime-${key}`),
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
  const { data } = mapJson
  data['map.aml'].issues.forEach(issue => {
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
              term: issue.term,
              slug: articleslug,
            },
          })
        })
      })
    })
  })
  /*
  for (let i = 1; i <= 6; i++) {
    const url = `https://kerckhoff.dailybruin.com/api/packages/prime?page=${i}`
    const response = await fetch(url)
    const json = await response.json()
    const { data, description } = json
    // Each article name is given as a key on in the JSON data, e.g., `"article.aml": {...}`
    Object.keys(data).forEach(key => {
      const article = data[key].data['article.aml']
      const slug = data[key].slug
      if (!article) return
      console.log(slug)
      return graphql(`
      {
        primeArticle(headline: {eq: "${article.headline}"}) {
          headline
          author
          authorbio
          authoremail
          authortwitter
          coverimg
          covercred
          coveralt
          articleType
          content {
            type
            value
          }
        }
      }
    `).then(_ => {
        createPage({
          path: `${slug.split('.').join('')}`,
          component: path.resolve(`./src/templates/article.tsx`),
          context: { headline: article.headline },
        })
      })
    })
  }
  */
}
