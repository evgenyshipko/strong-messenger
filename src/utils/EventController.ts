import { EventBus } from './EventBus'

// ивент бас-синглтон, который позволяет использовать ивенты по всему проекту
class EventController {
    private eventBus: EventBus
    private static __instance: EventController

    constructor() {
        if (EventController.__instance) {
            return EventController.__instance
        }
        this.eventBus = new EventBus()
        EventController.__instance = this
    }

    subscribe(event: string, callback: Function) {
        this.eventBus.on(event, callback)
    }

    emit(event: string, ...args: any[]) {
        this.eventBus.emit(event, ...args)
    }
}
export default EventController
