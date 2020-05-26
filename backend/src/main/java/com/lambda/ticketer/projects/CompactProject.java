package com.lambda.ticketer.projects;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class CompactProject {
    private long id;
    private String name;
    private Boolean owner;

    public CompactProject(Project project, Boolean owner) {
        this.id = project.getId();
        this.name = project.getName();
        this.owner = owner;
    }
}
