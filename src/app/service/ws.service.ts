import { Injectable } from '@angular/core';
import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {BehaviorSubject, Subject} from "rxjs";
import {UrlConstant} from "../constant/UrlConstant";

@Injectable({
  providedIn: 'root'
})
export class WsService {


  private stompClient:any;
  private isConnectedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  private WEBSOCKET_URL = UrlConstant.WEB_SOCKET_URL;

  constructor() { }

  initializeWebSocketConnection() {
    console.log("WS URL: "+this.WEBSOCKET_URL)
    const socket = new SockJS(this.WEBSOCKET_URL);
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str: string) => {
        console.log(str);
      },
    });

    this.stompClient.onConnect = () => {
      console.log('STOMP: connected to WebSocket');
      this.isConnectedSubject.next(true); // Notify connected state
    };

    this.stompClient.onStompError = (frame: any) => {
      console.error('STOMP: error', frame);
      this.isConnectedSubject.next(false); // Notify disconnected state
    };

    this.stompClient.activate();
  }

  subscribe(topic: string, callback: (message: any) => void) {
    this.isConnectedSubject.subscribe((connected: boolean) => {
      if (connected) {
        this.stompClient.subscribe(topic, (response: any) => {
          callback(JSON.parse(response.body));
        });
      } else {
        console.error("Cannot subscribe, STOMP connection not established");
        // You might want to handle retries or notify the UI appropriately
      }
    });
  }


}
