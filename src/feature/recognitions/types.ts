export type VendedorRankingDto = {
  id: number;
  nombre: string;
  ventas: number;
  monto: number;
  promedio: number;
};

export type CajeroRankingDto = {
  id: number;
  nombre: string;
  pedidos: number;
  ventas: number;
  total: number;
};

export type EntregaRankingDto = {
  id: number;
  nombre: string;
  entregas: number;
  puntualidad: number;
  distancia: number;
};

export type ProduccionRankingDto = {
  id: number;
  nombre: string;
  ordenes: number;
  unidades: number;
  eficiencia: number;
};

export type AreaRankingResponseDto = {
  vendedores: VendedorRankingDto[];
  cajeros: CajeroRankingDto[];
  entregas: EntregaRankingDto[];
  produccion: ProduccionRankingDto[];
};
