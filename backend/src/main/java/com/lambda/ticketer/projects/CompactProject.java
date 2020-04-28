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

    public CompactProject(Project project) {
        this.id = project.getId();
        this.name = project.getName();
    }
}
