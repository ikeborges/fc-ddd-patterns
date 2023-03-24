import EventInterface from "../../@shared/event/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: null;

  constructor() {
    this.dataTimeOccurred = new Date();
  }
}
