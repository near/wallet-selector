import { Component, Event, EventEmitter, h, Prop } from "@stencil/core";

@Component({
  tag: "alert-message",
  styleUrl: "alert-message.scss",
  shadow: true,
})
export class AlertMessage {
  @Prop() message!: string;

  @Event() nearBackEvent: EventEmitter<MouseEvent>;

  render() {
    return <div class="Modal-body Modal-alert-message">
      <p>{this.message}</p>
      <div class="action-buttons">
        <button class="left" onClick={e => this.nearBackEvent.emit(e)}>
          OK
        </button>
      </div>
    </div>;
  }
}
