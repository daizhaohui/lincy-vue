
import { Emitter,EventHandlerMap, EventType, Handler, EventHandlerList, WildCardEventHandlerList} from "../../types/emitter";

/**
 * Mitt: Tiny (~200b) functional event emitter / pubsub.
 * @name mitt
 * @returns {Mitt}
 */
export default function mitt(all?: EventHandlerMap): Emitter {
	 const _all = all || new Map();

	return {

		/**
		 * A Map of event names to registered handler functions.
		 */
		all:_all,

		/**
		 * Register an event handler for the given type.
		 * @param {string|symbol} type Type of event to listen for, or `"*"` for all events
		 * @param {Function} handler Function to call in response to given event
		 * @memberOf mitt
		 */
		on<T = any>(type: EventType, handler: Handler<T>) {
			const handlers = _all.get(type);
			const added = handlers && handlers.push(handler);
			if (!added) {
				_all.set(type, [handler]);
			}
		},

		/**
		 * Remove an event handler for the given type.
		 * @param {string|symbol} type Type of event to unregister `handler` from, or `"*"`
		 * @param {Function} handler Handler function to remove
		 * @memberOf mitt
		 */
		off<T = any>(type: EventType, handler: Handler<T>) {
			const handlers = _all.get(type);
			if (handlers) {
				// tslint:disable-next-line:no-bitwise
				handlers.splice(handlers.indexOf(handler) >>> 0, 1);
			}
		},

		/**
		 * Invoke all handlers for the given type.
		 * If present, `"*"` handlers are invoked after type-matched handlers.
		 *
		 * Note: Manually firing "*" handlers is not supported.
		 *
		 * @param {string|symbol} type The event type to invoke
		 * @param {Any} [evt] Any value (object is recommended and powerful), passed to each handler
		 * @memberOf mitt
		 */
		emit<T = any>(type: EventType, evt: T) {
			((_all.get(type) || []) as EventHandlerList).slice().map((handler) => { handler(evt); });
			((_all.get('*') || []) as WildCardEventHandlerList).slice().map((handler) => { handler(type, evt); });
		}
	};
}