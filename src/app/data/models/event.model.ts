export class EventModel {
  id?: number;
  name: string;
  dateTime: Date;
  participantes?: number;
  location: string;
  description: string;
  image: string;
  tag?: string;
}
