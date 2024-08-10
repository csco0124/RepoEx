// routes
import { PATH_MANAGEMENT, PATH_SAMPLE, PATH_CONFIG, DEFAULT_ADMIN_PATH } from '@routes/paths';
// components
import SvgColor from '@components/svg-color';
// ----------------------------------------------------------------------
const icon = (name) => <SvgColor src={`${DEFAULT_ADMIN_PATH}/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
	client: icon('ic_client'),
  set: icon('ic_set'),
	blog: icon('ic_blog'),
  scope: icon('ic_scope'),
  user: icon('ic_user'),
  chart: icon('ic_chart'),
  write: icon('ic_write'),
	ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  {
    subheader: 'Management',
    items: [
      // TODD : 아이콘 변경
      { title: 'Client(김민정)', path: PATH_MANAGEMENT.client, icon: ICONS.client },
      { title: 'Client Roles(박종석)', path: PATH_MANAGEMENT.roles, icon: ICONS.write },
      { title: 'User(최호진)', path: PATH_MANAGEMENT.user, icon: ICONS.user },
      { title: 'AuthType(문병윤)', path: PATH_MANAGEMENT.authType, icon: ICONS.user },
			{ title: 'Login History(김동건)', path: PATH_MANAGEMENT.loginHistory, icon: ICONS.user },
			{ title: 'Login Analytics(신석진)', path: PATH_MANAGEMENT.loginAnalytics, icon: ICONS.analytics },
			{ title: 'Role(원보현)', path: PATH_MANAGEMENT.role, icon: ICONS.user },
    ],
  },

  {
    subheader: 'SamplePage',
    items: [
      { title: 'SamplePage', path: PATH_SAMPLE.modal, icon: ICONS.set },
    ],
  },

  {
    subheader: 'Config',
    items: [
      { title: 'LoginConfig(문병윤)', path: PATH_CONFIG.loginConfig, icon: ICONS.set },
    ],
  },
];

export default navConfig;
