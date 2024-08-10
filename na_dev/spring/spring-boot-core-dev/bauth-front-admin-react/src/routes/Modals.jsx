import loadable from '@loadable/component'
import { WithLoadingScreen } from '@routes/elements';

//sample
export const ModalSample = WithLoadingScreen(loadable(() => import('@pages/sample/ModalSample')));
