mdlr('mdlr-posts', m => {

  const blog = [
    {
      title: 'post1',
      tldr: 'tl;dr - use mdlr',
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
          type: 'text',
          text: 'and, so, therefore: use mdlr'
        },
      ]
    }, {
      title: 'post2',
      tldr: 'tl;dr - use mdlr',
      meta: {
        slug: 'easy-to-find-post-2',
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
      ]
    }, {
      title: 'post3',
      tldr: 'tl;dr - use mdlr',
      meta: {
        slug: 'easy-to-find-post-3',
        publishdate: '20221014',
        lastupdate: [],
        author: 'dinges',
        tags: 'bla'
      },
      sections: [
        {
          type: 'text-right',
          url: '/user/blog/resources/mdlr.png',
          caption: '## asmodius',
          text: `
        Lorem ipsum *dolor** sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor ^incididunt ut^ labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat^^[2]^^. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum.`
        },
        {
          type: 'text-left',
          url: '/user/blog/resources/mdlr.png',
          caption: '### asmodius',
          text: `
        Lorem *ipsum* dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod **tempor** incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, ***quis*** nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. ~Excepteur sint occaecat cupidatat~ non proident, sunt in
        culpa qui ~~officia deserunt mollit~~ anim id est laborum.
        [tutorial-firewatch](https://localhost:8443/bundler/html?unit=[html]tutorial-firewatch)`
        },
        {
          type: 'text',
          caption: '### borg',
          text: `
        Lorem *ipsum* dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod **tempor** incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, ***quis*** nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. ~Excepteur sint occaecat cupidatat~ non proident, sunt in
        culpa qui ~~officia deserunt mollit~~ anim id est laborum.
        
        ![svg-clock](mdlr://localhost:8443/bundler/html?unit=[html]tutorial-svg-clock|style="height:25vh")

        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        ![logo](/user/blog/resources/mdlr.png)
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in.
        `
        },
      ]
    }, {
      title: 'post4',
      tldr: 'tl;dr - use mdlr',
      meta: {
        slug: 'easy-to-find-post-4',
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
      ]
    }];

  return { blog }

})