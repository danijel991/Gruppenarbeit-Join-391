class CreateTask {

    constructor(id, headline, description, priority, dueDate) {
        this.id = id,
        this.department = 'Design',
        this.headline = headline,
        this.description = description,
        this.assignedTo = [],
        this.priority = priority,
        this.category = 'to-do',
        this.dueDate = dueDate
        this.pushTask();
    }

    pushTask() {
        tasks.push(this);
    }
}