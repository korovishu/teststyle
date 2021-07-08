import { Client, Server } from 'styletron-engine-atomic';

const getHydrateClass = () =>
  document.getElementsByClassName('styletron_hydrate');

export const styletron =
  typeof window === 'undefined'
    ? new Server()
    : new Client({
        hydrate: getHydrateClass(),
      });
