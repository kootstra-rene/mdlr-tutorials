mdlr('mdlr-post1', m => {

  const blog = {
    title: 'post1',
    tldr: 'short description',
    meta: {
      slug: 'easy-to-find-post',
      publishdate: '20221014',
      lastupdate: [],
      author: 'dinges',
      tags: 'bla'
    },
    sections: [
      {
        type: 'text',
        text: 'It\'s a lovely day: ☀️☀️☀️'
      },
      {
        type: 'text-right',
        url: '/user/blog/resources/mdlr.png',
        text: 'text with a component to the left'
      },
      {
        type: 'text-left',
        url: '/user/blog/resources/mdlr.png',
        text: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
        culpa qui officia deserunt mollit anim id est laborum.`
      },
      {
        type: 'text',
        text: `
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
          culpa qui officia deserunt mollit anim id est laborum.`
      },
      {
        type: 'no-text',
        url: '[html]my-super-cool-mdlr-webgl-component',
      },
      {
        type: 'no-text',
        url: '/user/blog/resources/mdlr.png',
      },
      {
        type: 'text',
        text: 'and, so, therefore: use mdlr'
      },
    ]
  }

  return { blog }

})