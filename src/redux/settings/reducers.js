import store from 'store'
import actions from './actions'

const STORED_SETTINGS = (storedSettings) => {
  const settings = {}
  Object.keys(storedSettings).forEach((key) => {
    const item = store.get(`app.settings.${key}`)
    settings[key] = typeof item !== 'undefined' ? item : storedSettings[key]
  })
  return settings
}

const initialState = {
  ...STORED_SETTINGS({
    // Read docs for available values: https://docs.visualbuilder.cloud
    // VB:REPLACE-START:SETTINGS
    authProvider: 'jwt',
    logo: 'Binh Son BMS',
    version: 'v2.0.0',
    theme: 'default',
    locale: 'vi-VN',
    isSidebarOpen: false,
    isSupportChatOpen: false,
    isMobileView: false,
    isMobileMenuOpen: false,
    isMenuCollapsed: false,
    isPreselectedOpen: false,
    preselectedVariant: 'default',
    menuLayoutType: 'top',
    routerAnimation: 'slide-fadein-up',
    menuColor: 'dark',
    authPagesColor: 'gray',
    isAuthTopbar: true,
    primaryColor: '#4b7cf3',
    leftMenuWidth: 256,
    isMenuUnfixed: false,
    isMenuShadow: true,
    isTopbarFixed: true,
    isTopbarSeparated: false,
    isGrayTopbar: true,
    isContentMaxWidth: true,
    isAppMaxWidth: true,
    isGrayBackground: false,
    isCardShadow: true,
    isSquaredBorders: false,
    isBorderless: false,
    layoutMenu: 'flyout',
    layoutTopbar: 'v1',
    layoutBreadcrumbs: 'v2',
    layoutFooter: 'v3',
    flyoutMenuType: 'flyout',
    flyoutMenuColor: 'dark'

    // VB:REPLACE-END:SETTINGS
  })
}

export default function settingsReducer (state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
