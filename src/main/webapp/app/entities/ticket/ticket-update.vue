<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="burgerApp.ticket.home.createOrEditLabel">Create or edit a Ticket</h2>
                <div>
                    <div class="form-group" v-if="ticket.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="ticket.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="ticket-title">Title</label>
                        <input type="text" class="form-control" name="title" id="ticket-title"
                            :class="{'valid': !$v.ticket.title.$invalid, 'invalid': $v.ticket.title.$invalid }" v-model="$v.ticket.title.$model"  required/>
                        <div v-if="$v.ticket.title.$anyDirty && $v.ticket.title.$invalid">
                            <small class="form-text text-danger" v-if="!$v.ticket.title.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="ticket-description">Description</label>
                        <input type="text" class="form-control" name="description" id="ticket-description"
                            :class="{'valid': !$v.ticket.description.$invalid, 'invalid': $v.ticket.description.$invalid }" v-model="$v.ticket.description.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="ticket-dueDate">Due Date</label>
                        <b-input-group class="mb-3">
                            <b-input-group-prepend>
                                <b-form-datepicker
                                    aria-controls="ticket-dueDate"
                                    v-model="$v.ticket.dueDate.$model"
                                    name="dueDate"
                                    class="form-control"
                                    :locale="currentLanguage"
                                    button-only
                                    today-button
                                    reset-button
                                    close-button
                                >
                                </b-form-datepicker>
                            </b-input-group-prepend>
                            <b-form-input id="ticket-dueDate" type="text" class="form-control" name="dueDate"  :class="{'valid': !$v.ticket.dueDate.$invalid, 'invalid': $v.ticket.dueDate.$invalid }"
                            v-model="$v.ticket.dueDate.$model"  />
                        </b-input-group>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="ticket-date">Date</label>
                        <div class="d-flex">
                            <input id="ticket-date" type="datetime-local" class="form-control" name="date" :class="{'valid': !$v.ticket.date.$invalid, 'invalid': $v.ticket.date.$invalid }"
                            
                            :value="convertDateTimeFromServer($v.ticket.date.$model)"
                            @change="updateZonedDateTimeField('date', $event)"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="ticket-status">Status</label>
                        <select class="form-control" name="status" :class="{'valid': !$v.ticket.status.$invalid, 'invalid': $v.ticket.status.$invalid }" v-model="$v.ticket.status.$model" id="ticket-status" >
                            <option value="OPEN" >Open</option>
                            <option value="WAITING_FOR_RESPONSE" >Waiting for Customer Response</option>
                            <option value="CLOSED" >Closed</option>
                            <option value="DUPLICATE" >Duplicate</option>
                            <option value="IN_PROGRESS" >In Progress</option>
                            <option value="REOPENED" >Reopened</option>
                            <option value="CANNOT_REPRODUCE" >Cannot Reproduce</option>
                            <option value="SOLVED" >Solved</option>
                            <option value="WONT_IMPLEMENT" >Won&#39;t Implement</option>
                            <option value="VERIFIED" >Verified</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="ticket-type">Type</label>
                        <select class="form-control" name="type" :class="{'valid': !$v.ticket.type.$invalid, 'invalid': $v.ticket.type.$invalid }" v-model="$v.ticket.type.$model" id="ticket-type" >
                            <option value="BUG" >Bug</option>
                            <option value="FEATURE" >Feature</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="ticket-priority">Priority</label>
                        <select class="form-control" name="priority" :class="{'valid': !$v.ticket.priority.$invalid, 'invalid': $v.ticket.priority.$invalid }" v-model="$v.ticket.priority.$model" id="ticket-priority" >
                            <option value="HIGHEST" >Highest</option>
                            <option value="HIGHER" >Higher</option>
                            <option value="HIGH" >High</option>
                            <option value="NORMAL" >Normal</option>
                            <option value="LOW" >Low</option>
                            <option value="LOWER" >Lower</option>
                            <option value="LOWERST" >Lowest</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="ticket-assignedTo">Assigned To</label>
                        <select class="form-control" id="ticket-assignedTo" name="assignedTo" v-model="ticket.assignedTo">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="ticket.assignedTo && userOption.id === ticket.assignedTo.id ? ticket.assignedTo : userOption" v-for="userOption in users" :key="userOption.id">{{userOption.login}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="ticket-reportedBy">Reported By</label>
                        <select class="form-control" id="ticket-reportedBy" name="reportedBy" v-model="ticket.reportedBy">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="ticket.reportedBy && userOption.id === ticket.reportedBy.id ? ticket.reportedBy : userOption" v-for="userOption in users" :key="userOption.id">{{userOption.login}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.ticket.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./ticket-update.component.ts">
</script>
