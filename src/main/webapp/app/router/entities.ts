import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore

// prettier-ignore
const Ticket = () => import('@/entities/ticket/ticket.vue');
// prettier-ignore
const TicketUpdate = () => import('@/entities/ticket/ticket-update.vue');
// prettier-ignore
const TicketDetails = () => import('@/entities/ticket/ticket-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default [
  {
    path: '/ticket',
    name: 'Ticket',
    component: Ticket,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/ticket/new',
    name: 'TicketCreate',
    component: TicketUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/ticket/:ticketId/edit',
    name: 'TicketEdit',
    component: TicketUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/ticket/:ticketId/view',
    name: 'TicketView',
    component: TicketDetails,
    meta: { authorities: [Authority.USER] },
  },
  // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
];
