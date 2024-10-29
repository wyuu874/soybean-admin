const local: App.I18n.Schema = {
  system: {
    title: 'SoybeanAdmin',
    updateTitle: 'System Version Update Notification',
    updateContent: 'A new version of the system has been detected. Do you want to refresh the page immediately?',
    updateConfirm: 'Refresh immediately',
    updateCancel: 'Later'
  },
  common: {
    action: 'Action',
    add: 'Add',
    addSuccess: 'Add Success',
    backToHome: 'Back to home',
    batchDelete: 'Batch Delete',
    cancel: 'Cancel',
    close: 'Close',
    check: 'Check',
    expandColumn: 'Expand Column',
    columnSetting: 'Column Setting',
    config: 'Config',
    confirm: 'Confirm',
    delete: 'Delete',
    deleteSuccess: 'Delete Success',
    confirmDelete: 'Are you sure you want to delete?',
    edit: 'Edit',
    warning: 'Warning',
    error: 'Error',
    index: 'Index',
    keywordSearch: 'Please enter keyword',
    logout: 'Logout',
    logoutConfirm: 'Are you sure you want to log out?',
    lookForward: 'Coming soon',
    modify: 'Modify',
    modifySuccess: 'Modify Success',
    noData: 'No Data',
    operate: 'Operate',
    pleaseCheckValue: 'Please check whether the value is valid',
    refresh: 'Refresh',
    reset: 'Reset',
    search: 'Search',
    switch: 'Switch',
    tip: 'Tip',
    trigger: 'Trigger',
    update: 'Update',
    updateSuccess: 'Update Success',
    userCenter: 'User Center',
    yesOrNo: {
      yes: 'Yes',
      no: 'No'
    },
    createTime: 'Create Time',
    updateTime: 'Update Time',
    createSuccess: 'Create Success',
    enableStatus: {
      enabled: 'Enabled',
      disabled: 'Disabled'
    }
  },
  request: {
    logout: 'Logout user after request failed',
    logoutMsg: 'User status is invalid, please log in again',
    logoutWithModal: 'Pop up modal after request failed and then log out user',
    logoutWithModalMsg: 'User status is invalid, please log in again',
    refreshToken: 'The requested token has expired, refresh the token',
    tokenExpired: 'The requested token has expired'
  },
  theme: {
    themeSchema: {
      title: 'Theme Schema',
      light: 'Light',
      dark: 'Dark',
      auto: 'Follow System'
    },
    grayscale: 'Grayscale',
    colourWeakness: 'Colour Weakness',
    layoutMode: {
      title: 'Layout Mode',
      vertical: 'Vertical Menu Mode',
      horizontal: 'Horizontal Menu Mode',
      'vertical-mix': 'Vertical Mix Menu Mode',
      'horizontal-mix': 'Horizontal Mix menu Mode',
      reverseHorizontalMix: 'Reverse first level menus and child level menus position'
    },
    recommendColor: 'Apply Recommended Color Algorithm',
    recommendColorDesc: 'The recommended color algorithm refers to',
    themeColor: {
      title: 'Theme Color',
      primary: 'Primary',
      info: 'Info',
      success: 'Success',
      warning: 'Warning',
      error: 'Error',
      followPrimary: 'Follow Primary'
    },
    scrollMode: {
      title: 'Scroll Mode',
      wrapper: 'Wrapper',
      content: 'Content'
    },
    page: {
      animate: 'Page Animate',
      mode: {
        title: 'Page Animate Mode',
        fade: 'Fade',
        'fade-slide': 'Slide',
        'fade-bottom': 'Fade Zoom',
        'fade-scale': 'Fade Scale',
        'zoom-fade': 'Zoom Fade',
        'zoom-out': 'Zoom Out',
        none: 'None'
      }
    },
    fixedHeaderAndTab: 'Fixed Header And Tab',
    header: {
      height: 'Header Height',
      breadcrumb: {
        visible: 'Breadcrumb Visible',
        showIcon: 'Breadcrumb Icon Visible'
      }
    },
    tab: {
      visible: 'Tab Visible',
      cache: 'Tag Bar Info Cache',
      height: 'Tab Height',
      mode: {
        title: 'Tab Mode',
        chrome: 'Chrome',
        button: 'Button'
      }
    },
    sider: {
      inverted: 'Dark Sider',
      width: 'Sider Width',
      collapsedWidth: 'Sider Collapsed Width',
      mixWidth: 'Mix Sider Width',
      mixCollapsedWidth: 'Mix Sider Collapse Width',
      mixChildMenuWidth: 'Mix Child Menu Width'
    },
    footer: {
      visible: 'Footer Visible',
      fixed: 'Fixed Footer',
      height: 'Footer Height',
      right: 'Right Footer'
    },
    watermark: {
      visible: 'Watermark Full Screen Visible',
      text: 'Watermark Text'
    },
    themeDrawerTitle: 'Theme Configuration',
    pageFunTitle: 'Page Function',
    resetCacheStrategy: {
      title: 'Reset Cache Strategy',
      close: 'Close Page',
      refresh: 'Refresh Page'
    },
    configOperation: {
      copyConfig: 'Copy Config',
      copySuccessMsg: 'Copy Success, Please replace the variable "themeSettings" in "src/theme/settings.ts"',
      resetConfig: 'Reset Config',
      resetSuccessMsg: 'Reset Success'
    }
  },
  route: {
    login: 'Login',
    403: 'No Permission',
    404: 'Page Not Found',
    500: 'Server Error',
    'iframe-page': 'Iframe',
    home: 'Home',
    'user-center': 'User Center',
    system: 'System',
    'system_admin-role': 'Admin Role',
    'system_admin-user': 'Admin User',
    'system_admin-log': 'Admin Log',
    'system_admin-log_login-log': 'Login Log',
    'system_admin-log_operation-log': 'Operation Log',
    system_setting: 'Setting',
    system_setting_base: 'Base',
    'system_admin-menu': 'Admin Menu'
  },
  page: {
    login: {
      common: {
        loginOrRegister: 'Login / Register',
        userNamePlaceholder: 'Please enter user name',
        phonePlaceholder: 'Please enter phone number',
        codePlaceholder: 'Please enter verification code',
        passwordPlaceholder: 'Please enter password',
        confirmPasswordPlaceholder: 'Please enter password again',
        codeLogin: 'Verification code login',
        confirm: 'Confirm',
        back: 'Back',
        validateSuccess: 'Verification passed',
        loginSuccess: 'Login successfully',
        welcomeBack: 'Welcome back, {userName} !'
      },
      pwdLogin: {
        title: 'Password Login',
        rememberMe: 'Remember me',
        forgetPassword: 'Forget password?',
        register: 'Register',
        otherAccountLogin: 'Other Account Login',
        otherLoginMode: 'Other Login Mode',
        superAdmin: 'Super Admin',
        admin: 'Admin',
        user: 'User'
      },
      codeLogin: {
        title: 'Verification Code Login',
        getCode: 'Get verification code',
        reGetCode: 'Reacquire after {time}s',
        sendCodeSuccess: 'Verification code sent successfully',
        imageCodePlaceholder: 'Please enter image verification code'
      },
      register: {
        title: 'Register',
        agreement: 'I have read and agree to',
        protocol: '《User Agreement》',
        policy: '《Privacy Policy》'
      },
      resetPwd: {
        title: 'Reset Password'
      },
      bindWeChat: {
        title: 'Bind WeChat'
      }
    },
    home: {
      branchDesc:
        'For the convenience of everyone in developing and updating the merge, we have streamlined the code of the main branch, only retaining the homepage menu, and the rest of the content has been moved to the example branch for maintenance. The preview address displays the content of the example branch.',
      greeting: 'Good morning, {userName}, today is another day full of vitality!',
      weatherDesc: 'Today is cloudy to clear, 20℃ - 25℃!',
      projectCount: 'Project Count',
      todo: 'Todo',
      message: 'Message',
      downloadCount: 'Download Count',
      registerCount: 'Register Count',
      schedule: 'Work and rest Schedule',
      study: 'Study',
      work: 'Work',
      rest: 'Rest',
      entertainment: 'Entertainment',
      visitCount: 'Visit Count',
      turnover: 'Turnover',
      dealCount: 'Deal Count',
      projectNews: {
        title: 'Project News',
        moreNews: 'More News',
        desc1: 'Soybean created the open source project soybean-admin on May 28, 2021!',
        desc2: 'Yanbowe submitted a bug to soybean-admin, the multi-tab bar will not adapt.',
        desc3: 'Soybean is ready to do sufficient preparation for the release of soybean-admin!',
        desc4: 'Soybean is busy writing project documentation for soybean-admin!',
        desc5: 'Soybean just wrote some of the workbench pages casually, and it was enough to see!'
      },
      creativity: 'Creativity'
    },
    userCenter: {
      changePassword: {
        title: 'Change Password',
        form: {
          oldPassword: {
            title: 'Old Password',
            placeholder: 'Please enter your old password'
          },
          newPassword: {
            title: 'New Password',
            placeholder: 'Please enter a new password'
          },
          confirmPassword: {
            title: 'Confirm Password',
            placeholder: 'Please enter confirmation password'
          }
        }
      },
      loginLog: {
        title: 'Login Log',
        ip: 'IP',
        device: 'Login Device',
        createTime: 'Login Time',
        form: {
          ip: 'Please enter IP'
        }
      },
      operationLog: {
        title: 'Operation Log',
        ip: 'IP',
        device: 'Operating device',
        createTime: 'Operation time',
        behavior: 'Operation behavior',
        object: 'Operation Object',
        form: {
          ip: 'Please enter IP',
          behavior: 'Please select action behavior',
          object: 'Please enter the operation object'
        }
      }
    },
    system: {
      adminRole: {
        title: 'Role List',
        name: 'Role Name',
        description: 'Role Description',
        addAdminRole: 'Add Role',
        editAdminRole: 'Edit Role',
        form: {
          name: 'Please enter role name',
          description: 'please enter role description'
        }
      },
      adminUser: {
        title: 'User List',
        userName: 'User Name',
        password: 'Password',
        adminRoleName: 'Role',
        addAdminUser: 'Add User',
        editAdminUser: 'Edit User',
        form: {
          userName: 'Please enter user name',
          password: 'Please enter password',
          adminRoleName: 'Please select role'
        }
      },
      adminLog: {
        loginLog: {
          title: 'Login Log',
          userName: 'User Name',
          ip: 'IP',
          device: 'Login Device',
          createTime: 'Login Time',
          form: {
            userName: 'Please enter user name',
            ip: 'Please enter IP'
          }
        },
        operationLog: {
          title: 'Operation Log',
          userName: 'User Name',
          ip: 'IP',
          device: 'Operation Device',
          createTime: 'Operation Time',
          behavior: 'Operation Behavior',
          object: 'Operation Object',
          form: {
            userName: 'Please enter user name',
            ip: 'Please enter IP',
            behavior: 'Please select action behavior',
            object: 'Please enter the operation object'
          }
        }
      },
      setting: {
        enabledRemoteLogin: 'Enable remote login',
        form: {
          enabledRemoteLogin:
            '*After closure, all logged in accounts will be forcibly taken offline and can only log in on one device thereafter'
        }
      },
      adminMenu: {
        title: 'Admin Menu',
        menuType: 'Menu Type',
        menuName: 'Menu Name',
        component: 'Component',
        routeName: 'Route Name',
        routePath: 'Route Path',
        i18nKey: 'I18n Key',
        icon: 'Icon',
        status: 'Status',
        hideInMenu: 'Hide In Menu',
        keepAlive: 'Keep Alive',
        pid: 'Parent Menu ID',
        order: 'Order',
        isProps: 'Props',
        type: {
          constantRoute: 'Constant Route',
          defaultRoute: 'Default Route',
          permissionRoute: 'Permission Route'
        },
        addAdminMenu: 'Add Menu',
        editAdminMenu: 'Edit Menu',
        addChildAdminMenu: 'Add Sub Menu',
        form: {
          menuName: 'Please enter menu name',
          component: 'Please enter component',
          routeName: 'Please enter route name',
          routePath: 'Please enter route path',
          i18nKey: 'Please enter i18n key',
          icon: 'Please enter icon',
          order: 'Please enter order'
        }
      }
    }
  },
  form: {
    required: 'Cannot be empty',
    userName: {
      required: 'Please enter user name',
      invalid: '5-16 characters, including letters, numbers, underscores, starting with a letter'
    },
    phone: {
      required: 'Please enter phone number',
      invalid: 'Phone number format is incorrect'
    },
    pwd: {
      required: 'Please enter password',
      invalid: '6-18 characters, including letters, numbers, and underscores'
    },
    confirmPwd: {
      required: 'Please enter password again',
      invalid: 'The two passwords are inconsistent'
    },
    code: {
      required: 'Please enter verification code',
      invalid: 'Verification code format is incorrect'
    },
    email: {
      required: 'Please enter email',
      invalid: 'Email format is incorrect'
    }
  },
  dropdown: {
    closeCurrent: 'Close Current',
    closeOther: 'Close Other',
    closeLeft: 'Close Left',
    closeRight: 'Close Right',
    closeAll: 'Close All'
  },
  icon: {
    themeConfig: 'Theme Configuration',
    themeSchema: 'Theme Schema',
    lang: 'Switch Language',
    fullscreen: 'Fullscreen',
    fullscreenExit: 'Exit Fullscreen',
    reload: 'Reload Page',
    collapse: 'Collapse Menu',
    expand: 'Expand Menu',
    pin: 'Pin',
    unpin: 'Unpin'
  },
  datatable: {
    itemCount: 'Total {total} items'
  }
};

export default local;
