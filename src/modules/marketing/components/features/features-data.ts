import { LuWallet, LuBox, LuShoppingBag } from 'react-icons/lu'
import { RiAdminLine } from 'react-icons/ri'
import type { IconType } from 'react-icons'

export type CategoryId = 'financeiro' | 'operacao' | 'comercial' | 'administracao'

export type ModuleContent = {
    label: string
    headline: string
    benefit: string
    subtitle: string
    bullets: string[]
    highlight: { value: string; label: string }
}

export type CategoryContent = {
    id: CategoryId
    label: string
    icon: IconType
    tagline: string
    accent: 'purple' | 'orange' | 'green' | 'primary'
    adaptationLine: string
    modules: ModuleContent[]
}

export const FEATURE_CATEGORIES: CategoryContent[] = [
    {
        id: 'financeiro',
        label: 'Financeiro',
        icon: LuWallet,
        tagline: 'Clareza financeira para decidir com confiança.',
        accent: 'purple',
        adaptationLine: 'Relatórios e fluxos moldados ao seu regime contábil.',
        modules: [
            {
                label: 'Financeiro',
                headline: 'Cada real sob controle',
                benefit: 'Receitas, despesas e conciliação no mesmo lugar — sem planilha paralela.',
                subtitle: 'Gestão financeira integrada',
                bullets: ['Contas a pagar e receber', 'Conciliação bancária', 'Alertas de vencimento'],
                highlight: { value: 'R$ 52k', label: 'Saldo em tempo real' },
            },
            {
                label: 'Dashboard',
                headline: 'Decisões com dados',
                benefit: 'Receita, despesa e margem atualizados ao abrir o painel — sem esperar o fechamento.',
                subtitle: 'Indicadores para o gestor',
                bullets: ['Gráficos dos últimos 30 dias', 'Metas com progresso visual', 'Comparativo entre períodos'],
                highlight: { value: '+12%', label: 'Receita no mês' },
            },
            {
                label: 'Relatórios',
                headline: 'Relatórios que respondem',
                benefit: 'DRE, balancete e extratos prontos para exportar e compartilhar com um clique.',
                subtitle: 'Contabilidade e diretoria',
                bullets: ['DRE e balancete filtráveis', 'Agendamento recorrente', 'Exportação PDF e Excel'],
                highlight: { value: '24', label: 'Modelos disponíveis' },
            },
        ],
    },
    {
        id: 'operacao',
        label: 'Operação',
        icon: LuBox,
        tagline: 'Da entrada à expedição, tudo no mesmo fluxo.',
        accent: 'orange',
        adaptationLine: 'Etapas e alertas configurados para sua operação.',
        modules: [
            {
                label: 'Estoque',
                headline: 'Estoque que avisa antes',
                benefit: 'Movimentações atualizam saldo automaticamente e alertam quando o mínimo é atingido.',
                subtitle: 'Controle em tempo real',
                bullets: ['Entrada, saída e transferência', 'Alertas de estoque mínimo', 'Integrado a vendas e compras'],
                highlight: { value: '1.284', label: 'Itens monitorados' },
            },
            {
                label: 'Pedidos',
                headline: 'Do pedido à entrega',
                benefit: 'Acompanhe cada etapa com status personalizados — da separação à expedição.',
                subtitle: 'Rastreio completo',
                bullets: ['Status com sua linguagem', 'Histórico por pedido', 'Painel de pendências'],
                highlight: { value: '96%', label: 'Entregas no prazo' },
            },
            {
                label: 'Compras',
                headline: 'Compras sem emergência',
                benefit: 'Cotações, ordens e fornecedores ligados ao estoque — reposição vira processo.',
                subtitle: 'Abastecimento inteligente',
                bullets: ['Cotação multi-fornecedor', 'OC a partir do estoque mínimo', 'Histórico de preços'],
                highlight: { value: 'R$ 6,2k', label: 'Economia no trimestre' },
            },
        ],
    },
    {
        id: 'comercial',
        label: 'Comercial',
        icon: LuShoppingBag,
        tagline: 'Venda mais com visão clara do funil.',
        accent: 'green',
        adaptationLine: 'Funil e metas ajustados ao seu mercado.',
        modules: [
            {
                label: 'Vendas',
                headline: 'Oportunidades sempre visíveis',
                benefit: 'Metas, propostas e vendas do dia em um painel — gestor e vendedor na mesma página.',
                subtitle: 'Performance comercial',
                bullets: ['Funil do lead ao fechamento', 'Metas por equipe', 'Conversão ao vivo'],
                highlight: { value: '34%', label: 'Taxa de conversão' },
            },
            {
                label: 'Clientes (CRM)',
                headline: 'Relacionamento que vende',
                benefit: 'Histórico, contatos e oportunidades centralizados — antes de ligar, você já sabe tudo.',
                subtitle: 'CRM integrado ao ERP',
                bullets: ['Histórico de compras', 'Oportunidades com temperatura', 'Follow-ups automáticos'],
                highlight: { value: '1.203', label: 'Clientes ativos' },
            },
        ],
    },
    {
        id: 'administracao',
        label: 'Administração',
        icon: RiAdminLine,
        tagline: 'Organização e segurança para escalar.',
        accent: 'primary',
        adaptationLine: 'Permissões e alertas conforme sua estrutura.',
        modules: [
            {
                label: 'Usuários e Permissões',
                headline: 'Cada um vê só o necessário',
                benefit: 'Perfis claros por módulo e ação — segurança sem travar quem opera.',
                subtitle: 'Acesso granular',
                bullets: ['Perfis por tela e ação', 'Auditoria de alterações', '2FA para gestores'],
                highlight: { value: '8', label: 'Perfis configurados' },
            },
            {
                label: 'Agenda',
                headline: 'Compromissos conectados',
                benefit: 'Reuniões e tarefas ligadas a clientes e pedidos — nada fica solto.',
                subtitle: 'Agenda integrada',
                bullets: ['Vínculo com clientes', 'Lembretes automáticos', 'Visão diária da equipe'],
                highlight: { value: '14', label: 'Compromissos hoje' },
            },
            {
                label: 'Notificações',
                headline: 'Alerta certo, hora certa',
                benefit: 'Cada área recebe o que importa — estoque, financeiro ou meta comercial.',
                subtitle: 'Central de alertas',
                bullets: ['Regras por módulo', 'In-app e e-mail', 'Prioridade configurável'],
                highlight: { value: '12', label: 'Regras ativas' },
            },
        ],
    },
]

export const ACCENT_STYLES = {
    purple: {
        badge: 'bg-purple',
        text: 'text-purple',
        bg: 'bg-purple/10',
        ring: 'ring-purple/30',
        border: 'border-purple/20',
        gradient: 'from-purple/10 to-orange/5',
    },
    orange: {
        badge: 'bg-orange',
        text: 'text-orange',
        bg: 'bg-orange/10',
        ring: 'ring-orange/30',
        border: 'border-orange/20',
        gradient: 'from-orange/10 to-yellow/5',
    },
    green: {
        badge: 'bg-green',
        text: 'text-green',
        bg: 'bg-green/10',
        ring: 'ring-green/30',
        border: 'border-green/20',
        gradient: 'from-green/10 to-purple/5',
    },
    primary: {
        badge: 'bg-primary',
        text: 'text-primary',
        bg: 'bg-primary/10',
        ring: 'ring-primary/30',
        border: 'border-primary/20',
        gradient: 'from-primary/10 to-purple/5',
    },
} as const
