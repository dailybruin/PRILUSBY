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
    console.log('issue', issue)
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
      const article = data[key]
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
        children: [],
        content,
        id: createNodeId(`kerckhoff-${key}`),
        internal: {
          content: JSON.stringify(article),
          contentDigest: createHash('md5')
            .update(JSON.stringify(article))
            .digest('hex'),
          type: 'KerckhoffArticle',
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
  const { issues } = mapJson.data

  issues.forEach(issue => {
    return graphql(`
      {
        issue(term: {eq: "${issue.term}"}) {
          term
          title
          coverphoto
          articles
        }
      }
    `).then(result => {
      createPage({
        path: issue.term,
        component: path.resolve(`./src/templates/article.tsx`),
        context: { term: issue.term },
      })
    })
  })
}
