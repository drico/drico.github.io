/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import Icon from './Icon';
import { map } from 'lodash';
import { ReactNode } from 'react';

const { differenceInYears } = require('date-fns');

const MainSection = ({ title, icon }: { title: string; icon: string }) => {
  return (
    <div className='w-full mb-5 flex font-headers text-center font-bold text-xl justify-center items-center'>
      <div className='rounded-full bg-dark p-1 w-8 h-8 mr-2 text-white '>
        <Icon name={icon} size='big' className='pt-0.5' />
      </div>
      {title}
    </div>
  );
};

const Section = ({
  icon,
  company,
  title,
  date,
  children,
}: {
  icon: string;
  company: string;
  title: string;
  date: string;
  children?: ReactNode;
}) => {
  return (
    <div className='mb-8'>
      <div className='mb-1 font-headers font-bold text-base flex items-center'>
        <div className='text-light mr-4 flex'>
          <Icon name={icon} className='mr-1' size='medium' />
          <div>{company}</div>
          <Icon name='calendar_month' className='mr-1 ml-4' size='medium' />
          <div>{date}</div>
        </div>
        <div>{title}</div>
      </div>
      {children && <div>{children}</div>}
    </div>
  );
};

const CV = () => {
  return (
    <div className='text-base p-5'>
      <MainSection icon='work' title='EXPÉRIENCE' />

      <Section
        company='Total Energies'
        date='2019-2023'
        title='DEV FULL STACK'
        icon='apartment'
      >
        Développement de 7 applications B2B sur divers sujets liés aux
        lubrifiants industriels :
        <ul className='list-disc  pl-4'>
          <li>
            monitoring de performances de lubrifiants industriels pour des
            usines, des véhiclues, ou encore des navires
          </li>
          <li>analyse statistique de la santé de parcs machines</li>
          <li>
            analyse et simulation d'impacts climatiques pour la conception
            d'huiles
          </li>
        </ul>
        <br />
        Formation de développeurs juniors
        <br />
        <br />
        Mise en place de divers librairies afin de factoriser/uniformiser
        l'ensemble des projets, et de faciliter le travail des équipes et
        améliorer leur productivité
        <br />
        <br />
        Stack utilisée: React, NextJS, GraphQL (et Apollo), PostgreSQL,
        ElasticSearch, Material-UI, TailwindCSS, Express, TypeScript
      </Section>

      <Section
        company='Dior'
        date='été 2018'
        title='DEV BACKEND'
        icon='apartment'
      >
        Mission courte afin de développer "Willy" : un outil interne basé sur
        Cloudinary, permettant le traitement d'images catalogue
        (redimensionnement et mise sur fond transparent).
      </Section>

      <Section
        company='Feeligo'
        date='2014-2018'
        title='LEAD-DEV IOS, DATA-SCIENTIST, DEV BACKEND'
        icon='apartment'
      >
        <p className='mt-2'>
          En tant que <strong>Lead Dev</strong> iOS :
        </p>
        <ul className='list-disc  pl-4'>
          <li>
            Conception et réalisation d'un framework destiné à des clients
            professionnels, permettant à leurs applications d'envoyer aisément
            des stickers dans leur applications de messagerie.
          </li>
          <li>
            Conception et réalisation de plusieurs app iOS utilisant ce
            framework :
            <ul className='list-[circle] pl-4'>
              <li>
                Une app de tchat interne permettant l’envoi de texte et
                stickers.
              </li>
              <li>
                Un clavier spécialisé dans l’envoi de stickers. "StickerPicker"
              </li>
              <li>
                Une app dédiée au partage de stickers via FacebookMessenger.
              </li>
            </ul>
          </li>

          <li>
            Intégration de multiples frameworks permettant notamment : le
            tracking d’utilisateurs ; le tracking de bugs
          </li>
          <li>
            Intégration nos de solutions internes de tracking et nos diverses
            APIs.
          </li>
        </ul>
        <br />
        <p className='mt-2'>
          En tant que <strong>Data Scientist</strong> :
        </p>
        <ul className='list-disc pl-4'>
          <li>
            Création et automatisation de rapports internes de performance en
            Ruby puis Python
          </li>
          <li>
            Analyse du comportement des utilisateurs (clustering) en Python
          </li>
          <li>Conseils pour l'amélioration des performances</li>
          <li>Conception et réalisation d’un ETL (Ruby, NodeJS, AWS)</li>
          <li>
            Stockage et analyse de données, machine learning, etc... avec des
            outils tels que Amazon Web Services (AWS) et autres...
          </li>
        </ul>
        <br />
        <p className='mt-2'>
          En tant que Dev <strong>Back End</strong> :
        </p>
        <ul className='list-disc pl-4'>
          <li>Développement et maintenance d’applications Ruby et NodeJS</li>
          <li>
            Conception et réalisation d'un framework de création de chatbot
            Facebook, et utilisation de ce framework pour le développement de
            chatbots destinés à plusieurs grands comptes.
          </li>
        </ul>
      </Section>
      <Section
        company='MyBlee'
        date='2011-2014'
        title='LEAD-DEV IOS'
        icon='apartment'
      >
        Conception et réalisation d'une app iOS de grande taille en startup :
        <ul className='list-disc pl-4'>
          <li>Développeur principal de l’application</li>
          <li>Gestion d’une équipe d’une 20ène de développeurs</li>
          <li>
            Formation de stagiaires à l’Objective-C ainsi qu’au moteur de l’app
          </li>
          <li>Revue de code</li>
          <li>
            Implémentation de nombreux frameworks : user tracking, bug tracking,
            synthèse vocale, reconnaissance d’écriture manuscrite etc...
            Conception de l’API, intégration dans l’app iOS, mise en place de
            WebSocket pour une fonctionnalité de tchat.
          </li>
          <li>Mise en place d’intégration continue (Jenkins)</li>
        </ul>
      </Section>

      <MainSection icon='school' title='SCOLARITÉ' />

      <Section
        company='École d’art Boulle'
        date='2018-2019'
        title="CAP D'ÉBÉNISTERIE"
        icon='menu_book'
      >
        {"Année de césure afin de me former à l'ébénisterie"}
      </Section>
      <Section
        company='Télécom Paris-Tech'
        date='2009-2011'
        title='INGÉNIEUR TÉLÉCOM PARIS-TECH'
        icon='menu_book'
      >
        Parcours suivis :<br />
        <ul className='list-disc  pl-4'>
          <li>Intelligence, Complexité et Cognition</li>
          <li>Théorie et Paradigmes de l’Informatique</li>
          <li>Apprentissage, Fouille de données et Applications</li>
        </ul>
      </Section>
      <Section
        company='Université Paris 12'
        date='2005-2009'
        title='MAÎTRISE DE MATHÉMATIQUES APPLIQUÉES'
        icon='menu_book'
      >
        Mention Très Bien, major de promotion
        <br />
        Thèmes favoris: Probabilités, Processus stochastiques, Algèbre
      </Section>
      <Section
        company='Université Paris 12'
        date='2005-2008'
        title='LICENCE D’INFORMATIQUE'
        icon='menu_book'
      >
        Mention Très Bien, major de promotion
        <br />
        Thèmes favoris : Algorithmique, Complexité, Logique
      </Section>
    </div>
  );
};

export default CV;
