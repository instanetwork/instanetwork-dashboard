export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'subscription',
        data: {
          menu: {
            title: 'Subscription',
            icon: 'ion-ios-cart',
            selected: false,
            expanded: false,
            order: 1
          }
        }
      },
      {
        path: 'service',
        data: {
          menu: {
            title: 'Instanetwork',
            icon: 'ion-gear-b',
            selected: false,
            expanded: false,
            order: 2
          }
        }
      },
      {
        path: 'change',
        data: {
        }
      },
    ]
  }
];
