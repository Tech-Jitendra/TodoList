import { Api } from "./api"
import globalKeyStore from "./api/global-key-store"
import {globalKeyStoreObjectType} from "./api/global-key-store"
/**
 * The environment is a place where services and shared dependencies between
 * models live.  They are made available to every model via dependency injection.
 */
export class Environment {
  constructor() {
    // create each service
    this.api = new Api()
    this.globalKeyStore=globalKeyStore
  }

  async setup() {
    // allow each service to setup
    await this.api.setup()
  }
  /**
   * Our api.
   */
  api: Api
  globalKeyStore:globalKeyStoreObjectType
}
