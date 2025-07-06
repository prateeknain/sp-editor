import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import Header from '../../components/header';
import LoadingSpinner from '../../components/loadingSpinner';
import SiteScriptsCommands from './components/commands';

const SiteScripts = () => {
  return (
    <IonPage>
      <Header title={'Site scripts'} showOnLoad={false} headline="" content="" />
      {/* Actions menu */}
      <SiteScriptsCommands />
      <IonContent>
        <LoadingSpinner />
      </IonContent>
    </IonPage>
  );
};

export default SiteScripts;
