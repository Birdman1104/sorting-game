const DATA = {
    data: [
        {
            image: 'products/01J5AEXMK2FCRMF3RTT7JRPNP9.jpg',
            url: 'https://8f14-37-252-81-247.ngrok-free.appproducts/01J5AEXMK2FCRMF3RTT7JRPNP9.jpg',
            priority: 0,
        },
        {
            image: 'products/01J5ATAN3213ZPM2G277JM50WA.jpg',
            url: 'https://8f14-37-252-81-247.ngrok-free.appproducts/01J5ATAN3213ZPM2G277JM50WA.jpg',
            priority: 1,
        },
        {
            image: 'products/01J5AEXMK2FCRMF3RTT7JRPNP4.jpg',
            url: 'https://8f14-37-252-81-247.ngrok-free.appproducts/01J5AEXMK2FCRMF3RTT7JRPNP4.jpg',
            priority: 2,
        },
        {
            image: 'products/01J5AEXMK2FCRMF3RTT7JRPNP7.jpg',
            url: 'https://8f14-37-252-81-247.ngrok-free.appproducts/01J5AEXMK2FCRMF3RTT7JRPNP7.jpg',
            priority: 0,
        },
        {
            image: 'products/01J5AEXMK2FCRMF3RTT7JRPNP10.jpg',
            url: 'https://8f14-37-252-81-247.ngrok-free.appproducts/01J5AEXMK2FCRMF3RTT7JRPNP10.jpg',
            priority: 0,
        },
    ],
};


export const fetchData = (): Promise<any> => {
  return new Promise(resolve => setTimeout(() => resolve(DATA), 1000));
}