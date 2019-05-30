import { writable } from 'svelte/store';
import { Event } from '../types/Event';
import { ParticipantStatus } from '../types/ParticipantStatus';

const initialEvent: Event = {
  "id": 1,
  "name": "",
  "sponsor": "",
  "contact": "",
  "date": 0,
  "details": "",
  "location": "",
  "status": "",
  "maxParticipants": 0,
  "registrationOpens": 0,
  "createdOn": 0,
  "updatedOn": 0,
  "volume": 0,
  "sponsorLink": "",
  "participants": <any[]>[]
};


const {subscribe, set, update} = writable(initialEvent)
;

export default {
  subscribe,
  setEvent: (event: Event) => set(event),
  getParticipants: (status: ParticipantStatus) => {
    let participants: any[] = [];
    subscribe((event: Event) => {
      participants = event.participants.filter((p: any) => p.status === status.id)
    })
    return participants;
  }
}

