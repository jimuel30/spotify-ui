import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ApiCallService} from "../../service/api-call.service";
import {WsService} from "../../service/ws.service";
import {Message} from "../../interfaces/Message";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DomUtil} from "../../util/DomUtil";
import {UrlConstant} from "../../constant/UrlConstant";

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgStyle,
    NgIf
  ],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent implements OnInit{

  @Input() artistId!:string;
  @ViewChild('chatBox') chatBoxRef!: ElementRef;

  userId = "";

  topicKey = "";

  messages:Message[] =  []

  messageContent = "";




  constructor(private apiService: ApiCallService, private wsService:WsService) {}

  ngOnInit(): void {
        this.connectToWebSocket()
        this.joinQue();

  }

  ngAfterViewInit() {
    const height = DomUtil.getChatBoxHeight();
    const chatBoxElement =  this.chatBoxRef.nativeElement;
    console.log(chatBoxElement)
    console.log("Height: "+height)
    chatBoxElement.style.height = `${height}px`;
    chatBoxElement.style.maxHeight = `${height}px`;
    chatBoxElement.style.minHeight = `${height}px`;
  }




  joinQue(){
    const url = UrlConstant.QUE_URL+this.artistId;
    this.apiService.getWithoutBearer(url).subscribe({
      next: (v) => {
        this.topicKey = v.data.conversationKey;
        console.log("TOPIC KEY: "+this.topicKey)
        this.getUserProfile();
        this.subscribe();
      },
      error: (e) => {
        console.log("Error")
        console.log(e)
      },
      complete: () => console.info('complete'),
    });
  }

  getUserProfile(){
    this.apiService.getWithBearer(UrlConstant.GET_USER_PROFILE_URL).subscribe({
      next: (v) => {

        console.log(v.data)

        this.userId = v.data.id;

      },
      error: (e) => {
        console.log("Error")
        console.log(e)
      },
      complete: () => console.info('complete'),
    });
  }

  sendMessage(){
    if(this.messageContent !== ""){
      const message:Message = {
        content: this.messageContent,
        topic: this.topicKey,
        sender: this.userId
      }
      this.apiService.postWithBearer(UrlConstant.SEND_MESSAGE_URL,message).subscribe({
        next: (v) => {
          this.messageContent = "";
          console.log(v.data)
          // this.userId = v.data.id;

          console.log("SUCCESS")
        },
        error: (e) => {
          console.log("Error: ")
          console.log(e)
        },
        complete: () => console.info('complete'),
      });
    }
  }


  connectToWebSocket(){
    this.wsService.initializeWebSocketConnection();
  }


  subscribe(){
    this.wsService.subscribe("/topic/"+this.topicKey, (message: any) => {
      console.log('Received message:', message);
      this.messages.push(message);
      this.scrollToBottom()
    });
  }

  // ngAfterViewChecked() {
  //   this.scrollToBottom();
  // }

  scrollToBottom(): void {
    try {
      setTimeout(() => {
        this.chatBoxRef.nativeElement.scrollTop = this.chatBoxRef.nativeElement.scrollHeight;
      }, 0);
    } catch (err) {
      console.error('Scroll to bottom error:', err);
    }
  }


}
