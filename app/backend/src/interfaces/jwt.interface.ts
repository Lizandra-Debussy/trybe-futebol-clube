interface Ijwt {
  user: {
    id: string;
    iat: string;
    exp: number;
  }
}

export default Ijwt;
