import getSources from "./sources";

/**
 * Final output of bot detection.
 */
export type BotDetectionResult =
  | {
      bot: true;
      botKind: BotKind;
    }
  | {
      bot: false;
    };

/**
 * Enum for the source state.
 *
 * @readonly
 * @enum {number}
 */
export enum State {
  Unexpected = -100,
  Undefined = -1,
  Success = 1,
  Null = 101,
  UnexpectedBehaviour = 102,
  WrongType = 103,
  NotFunction = 104,
  ObfuscationError = 105,
}

/**
 * Enum for types of bots.
 *
 * @readonly
 * @enum {string}
 */
export enum BotKind {
  Unknown = "unknown",
  HeadlessChrome = "headless_chrome",
  PhantomJS = "phantomjs",
  Nightmare = "nightmare",
  Selenium = "selenium",
  Electron = "electron",
  NodeJS = "nodejs",
  Rhino = "rhino",
  CouchJS = "couchjs",
  Sequentum = "sequentum",
  SlimerJS = "slimerjs",
}

export type DetectionResponse = boolean | BotKind | undefined;

/**
 * Represents a component with state and value.
 */
export type Component<T> =
  | {
      state: State.Success;
      value: T;
    }
  | {
      state: Exclude<State, State.Success>;
      error: string;
    };

/**
 * Dictionary of default sources and their respective return types.
 */
export type DefaultSourcesDict = ReturnType<typeof getSources>;

/**
 * Represents a single signal response type.
 */
export type SignalType<T> = T extends (...args: any[]) => any
  ? Awaited<ReturnType<T>>
  : T;

/**
 * Dictionary of components.
 */
export type ComponentDict<T extends DefaultSourcesDict = DefaultSourcesDict> = {
  [K in keyof T]: Component<SignalType<T[K]>>;
};

/**
 * Interface for classes that represent a bot detector.
 *
 * @interface BotDetectorInterface
 */
export interface BotDetectorInterface {
  detect(): BotDetectionResult;
  collect(): Promise<void>;
}

/**
 * Bot detection error.
 */
export class BotdError extends Error {
  state: Exclude<State, State.Success>;

  /**
   * Creates a new BotdError.
   *
   * @class
   */
  constructor(state: Exclude<State, State.Success>, message: string) {
    super(message);
    this.state = state;
    this.name = "BotdError";
    Object.setPrototypeOf(this, BotdError.prototype);
  }
}

export enum BrowserKind {
  Unknown = "unknown",
  Chrome = "chrome",
  Firefox = "firefox",
  Opera = "opera",
  Safari = "safari",
  IE = "internet_explorer",
}
