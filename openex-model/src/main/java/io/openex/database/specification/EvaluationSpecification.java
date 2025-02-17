package io.openex.database.specification;

import io.openex.database.model.Evaluation;
import org.springframework.data.jpa.domain.Specification;


public class EvaluationSpecification {

    public static Specification<Evaluation> fromObjective(String objectiveId) {
        return (root, query, cb) -> cb.equal(root.get("objective").get("id"), objectiveId);
    }
}
