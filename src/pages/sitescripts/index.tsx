import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import Header from '../../components/header';
import LoadingSpinner from '../../components/loadingSpinner';
import SiteScriptsCommands from './components/commands';
import SiteScriptsEditPanel from './components/editpanel';
import SiteScriptsNewPanel from './components/newpanel';
import SiteScriptsList from './components/sitescriptslist';

const SiteScripts = () => {
  return (
    <IonPage>
      <Header title={'Site scripts'} showOnLoad={false} headline="" content="" />
      {/* Actions menu */}
      <SiteScriptsCommands />
      <IonContent>
        <LoadingSpinner />
        {/* List of sites scripts */}
        <SiteScriptsList />
        {/* Panel to edit site script */}
        <SiteScriptsEditPanel />
        {/* Panel to create new site script */}
        <SiteScriptsNewPanel />
      </IonContent>
    </IonPage>
  );
};

export default SiteScripts;
