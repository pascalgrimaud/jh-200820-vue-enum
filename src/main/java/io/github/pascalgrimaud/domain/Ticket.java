package io.github.pascalgrimaud.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.github.pascalgrimaud.domain.enumeration.Priority;
import io.github.pascalgrimaud.domain.enumeration.Status;
import io.github.pascalgrimaud.domain.enumeration.Type;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Ticket.
 */
@Entity
@Table(name = "ticket")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Ticket implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "date")
    private ZonedDateTime date;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private Type type;

    @Enumerated(EnumType.STRING)
    @Column(name = "priority")
    private Priority priority;

    @ManyToOne
    @JsonIgnoreProperties(value = "tickets", allowSetters = true)
    private User assignedTo;

    @ManyToOne
    @JsonIgnoreProperties(value = "tickets", allowSetters = true)
    private User reportedBy;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Ticket id(Long id) {
        this.id = id;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public Ticket title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public Ticket description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public Ticket dueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
        return this;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Ticket date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public Status getStatus() {
        return status;
    }

    public Ticket status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Type getType() {
        return type;
    }

    public Ticket type(Type type) {
        this.type = type;
        return this;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Priority getPriority() {
        return priority;
    }

    public Ticket priority(Priority priority) {
        this.priority = priority;
        return this;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public User getAssignedTo() {
        return assignedTo;
    }

    public Ticket assignedTo(User user) {
        this.assignedTo = user;
        return this;
    }

    public void setAssignedTo(User user) {
        this.assignedTo = user;
    }

    public User getReportedBy() {
        return reportedBy;
    }

    public Ticket reportedBy(User user) {
        this.reportedBy = user;
        return this;
    }

    public void setReportedBy(User user) {
        this.reportedBy = user;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ticket)) {
            return false;
        }
        return id != null && id.equals(((Ticket) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Ticket{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", dueDate='" + getDueDate() + "'" +
            ", date='" + getDate() + "'" +
            ", status='" + getStatus() + "'" +
            ", type='" + getType() + "'" +
            ", priority='" + getPriority() + "'" +
            "}";
    }
}
