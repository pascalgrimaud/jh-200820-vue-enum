<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="ticket">
                <h2 class="jh-entity-heading"><span>Ticket</span> {{ticket.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Title</span>
                    </dt>
                    <dd>
                        <span>{{ticket.title}}</span>
                    </dd>
                    <dt>
                        <span>Description</span>
                    </dt>
                    <dd>
                        <span>{{ticket.description}}</span>
                    </dd>
                    <dt>
                        <span>Due Date</span>
                    </dt>
                    <dd>
                        <span>{{ticket.dueDate}}</span>
                    </dd>
                    <dt>
                        <span>Date</span>
                    </dt>
                    <dd>
                        <span>{{ticket.date | formatDate}}</span>
                    </dd>
                    <dt>
                        <span>Status</span>
                    </dt>
                    <dd>
                        <span>{{ticket.status}}</span>
                    </dd>
                    <dt>
                        <span>Type</span>
                    </dt>
                    <dd>
                        <span>{{ticket.type}}</span>
                    </dd>
                    <dt>
                        <span>Priority</span>
                    </dt>
                    <dd>
                        <span>{{ticket.priority}}</span>
                    </dd>
                    <dt>
                        <span>Assigned To</span>
                    </dt>
                    <dd>
                        {{ticket.assignedTo ? ticket.assignedTo.login : ''}}
                    </dd>
                    <dt>
                        <span>Reported By</span>
                    </dt>
                    <dd>
                        {{ticket.reportedBy ? ticket.reportedBy.login : ''}}
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="ticket.id" :to="{name: 'TicketEdit', params: {ticketId: ticket.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./ticket-details.component.ts">
</script>
