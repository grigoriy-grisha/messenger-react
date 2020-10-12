import React, { Suspense } from 'react';
import Fallback from '../components/common/fallback';

const Page = React.lazy(() => import('../pages/page/Page'));

export function MainRouter() {


        return (
            <Suspense fallback={<Fallback />}>
                <Page />
            </Suspense>
        );
    
}

