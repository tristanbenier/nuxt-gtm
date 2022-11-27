export interface GTMInterface {
  push: (eventName: string, eventData?: any) => void;
}

export class GTM implements GTMInterface {
  push (eventName: string, eventData: any = {}) {
    if (!window.dataLayer) {
      window.dataLayer = [];
    }

    window.dataLayer.push({
      event: eventName,
      ...eventData,
    });
  }
}

declare global {
  interface Window {
    dataLayer: any;
  }
}
