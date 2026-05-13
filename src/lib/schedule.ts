// Atendimento sempre disponível (sem restrição de horário).
export type OpenStatus = {
  open: boolean;
  message: string;
  nextOpening?: string;
};

export function getOpenStatus(_now: Date = new Date()): OpenStatus {
  return { open: true, message: "Aberto agora — faça seu pedido." };
}
