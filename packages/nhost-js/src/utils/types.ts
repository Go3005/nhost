import type { AxiosResponse } from 'axios'

import { NhostAuthConstructorParams } from '@nhost/hasura-auth-js'

export type { NhostAuthConstructorParams }

export type BackendUrl = {
  /**
   * Nhost backend URL
   * Should only be used when self-hosting
   */
  backendUrl: string
  /**
   * When set, the admin secret is sent as a header, `x-hasura-admin-secret`,
   * for all requests to GraphQL, Storage, and Serverless Functions.
   */
  adminSecret?: string
}

export type Subdomain = {
  /**
   * Project subdomain (e.g. `ieingiwnginwnfnegqwvdqwdwq`)
   * Use `localhost` during local development
   */
  subdomain: string

  /**
   * Project region (e.g. `eu-central-1`)
   * Project region is not required during local development (when `subdomain` is `localhost`)
   */
  region?: string
  /**
   * When set, the admin secret is sent as a header, `x-hasura-admin-secret`,
   * for all requests to GraphQL, Storage, and Serverless Functions.
   */
  adminSecret?: string
}

export type BackendOrSubdomain = BackendUrl | Subdomain

export interface NhostClientConstructorParams
  extends Partial<BackendUrl>,
    Partial<Subdomain>,
    Omit<NhostAuthConstructorParams, 'url'> {}

export type GraphqlRequestResponse<T = unknown> =
  | {
      data: null
      error: Error | object | object[]
    }
  | {
      data: T
      error: null
    }

export type FunctionCallResponse<T = unknown> =
  | {
      res: AxiosResponse<T>
      error: null
    }
  | {
      res: null
      error: Error
    }

export interface GraphqlResponse<T = object> {
  errors?: object[]
  data?: T
}
