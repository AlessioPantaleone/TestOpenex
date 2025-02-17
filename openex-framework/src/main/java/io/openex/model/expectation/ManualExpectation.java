package io.openex.model.expectation;

import io.openex.database.model.InjectExpectation;
import io.openex.model.Expectation;

import java.util.Objects;

public class ManualExpectation implements Expectation {
    private Integer score;

    public ManualExpectation(Integer score) {
        setScore(Objects.requireNonNullElse(score, 100));
    }

    @Override
    public InjectExpectation.EXPECTATION_TYPE type() {
        return InjectExpectation.EXPECTATION_TYPE.MANUAL;
    }

    @Override
    public Integer score() {
        return score;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }
}
