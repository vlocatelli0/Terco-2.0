const PRAYERS = {
  sinalDaCruz: 'Pelo sinal da Santa Cruz, livrai-nos Deus, nosso Senhor, dos nossos inimigos. Em nome do Pai, do Filho e do Espírito Santo. Amém.',
  oferecimento: 'Divino Jesus, nós Vos oferecemos este terço que vamos rezar, meditando nos mistérios da nossa Redenção. Concedei-nos, por intercessão de Maria Santíssima, as graças necessárias para rezá-lo com devoção.',
  credo: 'Creio em Deus Pai todo-poderoso, Criador do céu e da terra; e em Jesus Cristo, Seu único Filho, nosso Senhor; que foi concebido pelo poder do Espírito Santo; nasceu da Virgem Maria; padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus; está sentado à direita de Deus Pai todo-poderoso, donde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo, na Santa Igreja Católica, na comunhão dos santos, na remissão dos pecados, na ressurreição da carne e na vida eterna. Amém.',
  paiNosso: 'Pai nosso, que estais nos Céus, santificado seja o Vosso Nome; venha a nós o Vosso Reino; seja feita a Vossa vontade, assim na terra como no Céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.',
  aveMaria: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois Vós entre as mulheres e bendito é o fruto do Vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora da nossa morte. Amém.',
  gloria: 'Glória ao Pai, ao Filho e ao Espírito Santo. Assim como era no princípio, agora e sempre, e por todos os séculos dos séculos. Amém.',
  fatima: 'Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o céu, principalmente as que mais precisarem.',
  salveRainha: 'Salve Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos os degredados filhos de Eva; a vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei; e depois deste desterro, mostrai-nos Jesus, bendito fruto do vosso ventre. Ó clemente, ó piedosa, ó doce sempre Virgem Maria. Rogai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.'
};

const MYSTERY_SETS = {
  gozosos: { label: 'Mistérios Gozosos', subtitle: 'Segundas e Sábados', mysteries: ['A Anunciação do Arcanjo Gabriel a Maria', 'A Visitação de Maria a sua prima Santa Isabel', 'O Nascimento de Jesus em Belém', 'A Apresentação do Menino Jesus no Templo', 'A Perda e o Encontro de Jesus entre os doutores no Templo'] },
  dolorosos: { label: 'Mistérios Dolorosos', subtitle: 'Terças e Sextas', mysteries: ['A Agonia de Jesus no Horto das Oliveiras', 'A Flagelação de Jesus atado à coluna', 'A Coroação de Espinhos', 'Jesus carregando a Cruz a caminho do Calvário', 'A Crucificação e Morte de Jesus'] },
  gloriosos: { label: 'Mistérios Gloriosos', subtitle: 'Quartas e Domingos', mysteries: ['A Ressurreição de Jesus', 'A Ascensão de Jesus ao Céu', 'A descida do Espírito Santo sobre os Apóstolos (Pentecostes)', 'A Assunção de Maria ao Céu', 'A Coroação de Maria como Rainha do Céu'] },
  luminosos: { label: 'Mistérios Luminosos', subtitle: 'Quintas', mysteries: ['O Batismo de Jesus no Rio Jordão', 'A autorrevelação de Jesus nas Bodas de Caná', 'O anúncio do Reino de Deus e o convite à conversão', 'A Transfiguração de Jesus no Monte Tabor', 'A Instituição da Eucaristia na Última Ceia'] }
};

const screenSelect = document.getElementById('screen-select');
const screenRosary = document.getElementById('screen-rosary');
const mysteryButtons = document.querySelectorAll('.mystery-btn');
const backButton = document.getElementById('back-btn');
const crossButton = document.getElementById('cross-button');

const chosenMystery = document.getElementById('chosen-mystery');
const beadLayer = document.getElementById('bead-layer');
const guideStep = document.getElementById('guide-step');
const guideTitle = document.getElementById('guide-title');
const guideMystery = document.getElementById('guide-mystery');
const guidePrayer = document.getElementById('guide-prayer');

const loopPath = document.getElementById('loop-path');
const stemPath = document.getElementById('stem-path');

let sequence = [];
let positions = [];
let activeIndex = 0;

function buildSequence(mysteryKey) {
  const selected = MYSTERY_SETS[mysteryKey];
  const list = [];

  list.push({
    type: 'Ritos Iniciais',
    title: 'Cruz: Sinal da Cruz + Oferecimento + Credo',
    mystery: 'Início da oração',
    prayer: `${PRAYERS.sinalDaCruz}\n\nOferecimento:\n${PRAYERS.oferecimento}\n\nCredo:\n${PRAYERS.credo}`
  });

  list.push({ type: 'Ritos Iniciais', title: 'Pai Nosso (conta grande)', mystery: 'Preparação', prayer: PRAYERS.paiNosso });
  list.push({ type: 'Ritos Iniciais', title: '1ª Ave-Maria', mystery: 'Pela virtude da Fé', prayer: PRAYERS.aveMaria });
  list.push({ type: 'Ritos Iniciais', title: '2ª Ave-Maria', mystery: 'Pela virtude da Esperança', prayer: PRAYERS.aveMaria });
  list.push({ type: 'Ritos Iniciais', title: '3ª Ave-Maria', mystery: 'Pela virtude da Caridade', prayer: PRAYERS.aveMaria });
  list.push({ type: 'Ritos Iniciais', title: 'Conta grande: Glória ao Pai + Ó meu Jesus', mystery: 'Louvor e jaculatória antes da medalha', prayer: `${PRAYERS.gloria}\n\n${PRAYERS.fatima}` });

  list.push({
    type: 'Medalha Central',
    title: 'Medalha: Anúncio do 1º Mistério + Pai Nosso',
    mystery: `${selected.label}: ${selected.mysteries[0]}`,
    prayer: `Anuncie e medite: ${selected.mysteries[0]}.\n\n${PRAYERS.paiNosso}`
  });

  // Dezena 1: 10 contas menores separadas (Ave 1..10)
  for (let n = 1; n <= 10; n += 1) {
    const end = n === 10 ? `\n\n${PRAYERS.gloria}\n\n${PRAYERS.fatima}` : '';
    list.push({ type: 'Dezena 1', title: `Ave-Maria ${n}/10${n === 10 ? ' + Glória + Jaculatória' : ''}`, mystery: `${selected.label}: ${selected.mysteries[0]}`, prayer: `${PRAYERS.aveMaria}${end}` });
  }

  // Dezenas 2..5: conta grande (anúncio + pai) + 10 menores
  for (let decade = 2; decade <= 5; decade += 1) {
    const mystery = selected.mysteries[decade - 1];
    list.push({ type: `Dezena ${decade}`, title: `Conta grande: Anúncio do ${decade}º Mistério + Pai Nosso`, mystery: `${selected.label}: ${mystery}`, prayer: `Anuncie e medite: ${mystery}.\n\n${PRAYERS.paiNosso}` });

    for (let n = 1; n <= 10; n += 1) {
      const closing = n === 10 ? `\n\n${PRAYERS.gloria}\n\n${PRAYERS.fatima}${decade === 5 ? `\n\nAo final do terço, reze a Salve Rainha:\n${PRAYERS.salveRainha}` : ''}` : '';
      list.push({ type: `Dezena ${decade}`, title: `Ave-Maria ${n}/10${n === 10 ? ' + Glória + Jaculatória' : ''}`, mystery: `${selected.label}: ${mystery}`, prayer: `${PRAYERS.aveMaria}${closing}` });
    }
  }

  return list;
}

function buildPositions() {
  const result = [];

  // Haste inicial PADRONIZADA (de baixo para cima):
  // - cruz -> conta grande: espaçamento maior (destaque)
  // - conta menor -> conta menor: espaçamento uniforme
  // - última menor -> medalha: espaçamento maior (destaque da medalha)
  result.push({ x: 250, y: 954, kind: 'large' }); // Pai-Nosso
  result.push({ x: 250, y: 902, kind: 'small' }); // 1ª Ave
  result.push({ x: 250, y: 850, kind: 'small' }); // 2ª Ave
  result.push({ x: 250, y: 798, kind: 'small' }); // 3ª Ave
  result.push({ x: 250, y: 744, kind: 'large' }); // Glória + Ó meu Jesus

  // medalha central (centralizada no eixo e no encontro do laço)
  result.push({ x: 250, y: 705, kind: 'medal' });

  // Laço: mantém padrão com 10 menores entre contas grandes,
  // porém reduz isolamento da medalha com margem lateral moderada.
  const loopLength = loopPath.getTotalLength();
  const largeAt = new Set([10, 21, 32, 43]);
  const sideGap = 0.035;
  for (let i = 0; i < 54; i += 1) {
    const progress = sideGap + (i / 53) * (1 - sideGap * 2);
    const p = loopPath.getPointAtLength(progress * loopLength);
    result.push({ x: p.x, y: p.y, kind: largeAt.has(i) ? 'large' : 'small' });
  }

  return result;
}

function renderRosary() {
  beadLayer.innerHTML = '';

  crossButton.dataset.active = activeIndex === 0 ? 'true' : 'false';
  crossButton.title = sequence[0].title;
  crossButton.onclick = () => {
    activeIndex = 0;
    updateGuide();
    updateActive();
  };

  for (let i = 1; i < sequence.length; i += 1) {
    const pos = positions[i - 1];
    const bead = document.createElement('button');
    bead.className = 'bead';
    bead.type = 'button';
    bead.style.left = `${(pos.x / 500) * 100}%`;
    bead.style.top = `${(pos.y / 1080) * 100}%`;
    bead.dataset.kind = pos.kind;
    bead.dataset.index = String(i);
    bead.dataset.active = i === activeIndex ? 'true' : 'false';
    bead.setAttribute('aria-label', `Etapa ${i + 1}: ${sequence[i].title}`);

    bead.addEventListener('click', () => {
      activeIndex = i;
      updateGuide();
      updateActive();
    });

    beadLayer.appendChild(bead);
  }
}

function updateActive() {
  crossButton.dataset.active = activeIndex === 0 ? 'true' : 'false';
  beadLayer.querySelectorAll('.bead').forEach((bead) => {
    const idx = Number(bead.dataset.index);
    bead.dataset.active = idx === activeIndex ? 'true' : 'false';
  });
}

function updateGuide() {
  const current = sequence[activeIndex];
  guideStep.textContent = `Etapa ${activeIndex + 1} de ${sequence.length} • ${current.type}`;
  guideTitle.textContent = current.title;
  guideMystery.textContent = `Mistério atual: ${current.mystery}`;
  guidePrayer.textContent = current.prayer;
}

function openRosaryScreen(mysteryKey) {
  const selected = MYSTERY_SETS[mysteryKey];
  chosenMystery.textContent = `${selected.label} • ${selected.subtitle}`;

  sequence = buildSequence(mysteryKey);
  positions = buildPositions();
  activeIndex = 0;

  renderRosary();
  updateGuide();

  screenSelect.classList.remove('screen--active');
  screenRosary.classList.add('screen--active');
  screenSelect.hidden = true;
  screenRosary.hidden = false;
  window.location.hash = 'terco';
}

function goBackToSelection() {
  screenRosary.classList.remove('screen--active');
  screenSelect.classList.add('screen--active');
  screenRosary.hidden = true;
  screenSelect.hidden = false;
  window.location.hash = 'inicio';
}

mysteryButtons.forEach((btn) => btn.addEventListener('click', () => openRosaryScreen(btn.dataset.mystery)));
backButton.addEventListener('click', goBackToSelection);

screenSelect.hidden = false;
screenRosary.hidden = true;
window.location.hash = 'inicio';