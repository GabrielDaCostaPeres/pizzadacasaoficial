// Horário de atendimento: Terça a Domingo, 19h às 23h. Segunda fechada.
export type OpenStatus = {
  open: boolean;
  message: string;
  nextOpening?: string;
};

const DAY_NAMES = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

export function getOpenStatus(now: Date = new Date()): OpenStatus {
  const day = now.getDay(); // 0=dom ... 6=sab
  const hour = now.getHours();
  const minute = now.getMinutes();
  const minutes = hour * 60 + minute;

  const OPEN = 19 * 60;
  const CLOSE = 23 * 60;

  // Segunda-feira fechada
  if (day === 1) {
    return {
      open: false,
      message: "Estamos fechados às segundas. Atendimento de terça a domingo, das 19h às 23h.",
      nextOpening: "Terça-feira às 19h",
    };
  }

  if (minutes >= OPEN && minutes < CLOSE) {
    return { open: true, message: "Aberto agora — pedidos até 23h." };
  }

  // Fora do horário
  let next = "";
  if (minutes < OPEN) {
    next = `hoje (${DAY_NAMES[day]}) às 19h`;
  } else {
    // depois das 23h — próximo dia (pulando segunda)
    let nextDay = (day + 1) % 7;
    if (nextDay === 1) nextDay = 2;
    next = `${DAY_NAMES[nextDay]} às 19h`;
  }

  return {
    open: false,
    message: `No momento estamos fechados. Abrimos ${next}.`,
    nextOpening: next,
  };
}
