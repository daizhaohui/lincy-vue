export declare type EventType = string | symbol;

// An event handler can take an optional event argument
// and should not return a value
export declare type Handler<T = any> = (event?: T) => void;
export declare type WildcardHandler = (type: EventType, event?: any) => void;
export declare type EventHandlerList = Handler[];
export declare type WildCardEventHandlerList = WildcardHandler[];

// A map of event types and their corresponding event handlers.
export type EventHandlerMap = Map<EventType, EventHandlerList | WildCardEventHandlerList>;

export declare interface Emitter {
	all: EventHandlerMap;

	on<T = any>(type: EventType, handler: Handler<T>): void;
	on(type: '*', handler: WildcardHandler): void;

	off<T = any>(type: EventType, handler: Handler<T>): void;
	off(type: '*', handler: WildcardHandler): void;

	emit<T = any>(type: EventType, event?: T): void;
	emit(type: '*', event?: any): void;
}