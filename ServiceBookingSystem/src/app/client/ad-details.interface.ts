export interface AdDetailsResponse {
    reviews: any;
    adDto: {
        adId: number;               
        serviceName: string;
        price: number;              
        description: string;
        img: Uint8Array;            // byte[] in Java maps to Uint8Array in TypeScript
        file: File;                 // MultipartFile in Java can be mapped to File in TypeScript
        userId: number;           
        companyName: string;
    };
  }