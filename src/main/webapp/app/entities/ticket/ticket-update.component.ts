import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import UserService from '@/admin/user-management/user-management.service';

import AlertService from '@/shared/alert/alert.service';
import { ITicket, Ticket, Priority } from '@/shared/model/ticket.model';
import TicketService from './ticket.service';

const validations: any = {
  ticket: {
    title: {
      required,
    },
    description: {},
    dueDate: {},
    date: {},
    status: {},
    type: {},
    priority: {},
  },
};

@Component({
  validations,
})
export default class TicketUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('ticketService') private ticketService: () => TicketService;
  public ticket: ITicket = new Ticket();

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.ticketId) {
        vm.retrieveTicket(to.params.ticketId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
    this.ticket.priority = Priority.HIGH;
  }

  public save(): void {
    this.isSaving = true;
    if (this.ticket.id) {
      this.ticketService()
        .update(this.ticket)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Ticket is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.ticketService()
        .create(this.ticket)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Ticket is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date) {
      return format(date, DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.ticket[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.ticket[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.ticket[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.ticket[field] = null;
    }
  }

  public retrieveTicket(ticketId): void {
    this.ticketService()
      .find(ticketId)
      .then(res => {
        res.date = new Date(res.date);
        this.ticket = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
  }
}
