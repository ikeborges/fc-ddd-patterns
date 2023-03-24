import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerChangedAdressEvent from "../customer-changed-address.event";

export default class EnviaConsoleLogHandler
  implements EventHandlerInterface<CustomerChangedAdressEvent>
{
  handle(event: CustomerChangedAdressEvent): void {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${
        event.eventData.name
      } alterado para: ${event.eventData.address.toString()}"`
    );
  }
}
