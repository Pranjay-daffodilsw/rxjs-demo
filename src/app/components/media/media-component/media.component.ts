import { Component, ElementRef, OnInit, Query, ViewChild } from '@angular/core';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.less']
})
export class MediaComponent implements OnInit {

  @ViewChild('mediaWindow') mediaWindow!: ElementRef<HTMLVideoElement>
  constructor() { }

  ngOnInit(): void {
  }

  public getAccess() {
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    })
      .then((stream: MediaStream) => {

        const videoTracks = stream.getVideoTracks();
        const track = videoTracks[0];

        alert(`Getting video from: ${track.label}`)
        // document.querySelector('video').srcObject = stream
        this.mediaWindow.nativeElement.srcObject = stream;
        // document.querySelector('#get-access').setAttribute('hidden', true)
        //The video stream is stopped by track.stop() after 3 second of playback.
        // setTimeout(() =&gt; { track.stop() }, 3 * 1000)
      })
      .catch((reason) => {
        alert(`${reason.name}`)
        console.error(reason)
      })
  }

}
