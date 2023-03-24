import EventDispatcher from "../../@shared/event/event-dispatcher";
import Address from "../value-object/address";
import CustomerChangedAddressEvent from "./customer-changed-address.event";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLog1Handler from "./handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log-2.handler";
import EnviaConsoleLogHandler from "./handler/envia-console-log.handler";

describe("Customer events", () => {
  let dispatcher: EventDispatcher;
  let mockedConsoleLog: jest.SpyInstance;

  beforeEach(() => {
    dispatcher = new EventDispatcher();
    mockedConsoleLog = jest.spyOn(console, "log");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should log `Log1Handler's` message when CustomerCreated event is notified", () => {
    const event = new CustomerCreatedEvent();
    const eventHandler = new EnviaConsoleLog1Handler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    dispatcher.register("CustomerCreatedEvent", eventHandler);
    dispatcher.notify(event);

    expect(spyEventHandler).toBeCalled();
    expect(mockedConsoleLog).toBeCalledWith(
      "Esse é o primeiro console.log do evento: CustomerCreated"
    );
  });

  it("should log `Log2Handler's` message when CustomerCreated event is notified", () => {
    const event = new CustomerCreatedEvent();
    const eventHandler = new EnviaConsoleLog2Handler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    dispatcher.register("CustomerCreatedEvent", eventHandler);
    dispatcher.notify(event);

    expect(spyEventHandler).toBeCalled();
    expect(mockedConsoleLog).toBeCalledWith(
      "Esse é o segundo console.log do evento: CustomerCreated"
    );
  });

  it("should log `LogHandler's` message when CustomerChangedAddress event is notified", () => {
    const event = new CustomerChangedAddressEvent({
      id: "1",
      name: "John Doe",
      address: new Address("Street", 1, "11111-111", "Somewhere"),
    });
    const eventHandler = new EnviaConsoleLogHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    dispatcher.register("CustomerChangedAddressEvent", eventHandler);
    dispatcher.notify(event);

    expect(spyEventHandler).toBeCalled();
    expect(mockedConsoleLog).toBeCalledWith(
      `Endereço do cliente: ${event.eventData.id}, ${
        event.eventData.name
      } alterado para: ${event.eventData.address.toString()}"`
    );
  });
});
