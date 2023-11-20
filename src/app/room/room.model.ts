export class Room {
  constructor(
    // sintakticki secer za manji konstruktor
    public id: number,
    public name: string,
    public beds: number,
    public price: number,
    public extraCost: number,
    public wifi: boolean,
    public airConditioning: boolean,
    public miniBar: boolean,
    public sauna: boolean
  ) {}
}
