package io.openex.injects.manual;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.jsontype.NamedType;
import io.openex.injects.manual.form.ManualForm;
import io.openex.injects.manual.model.ManualContent;
import io.openex.execution.ExecutableInject;
import io.openex.execution.Execution;
import io.openex.execution.Executor;
import org.springframework.stereotype.Component;

@Component
public class ManualExecutor implements Executor<ManualContent> {

    public ManualExecutor(ObjectMapper mapper) {
        mapper.registerSubtypes(new NamedType(ManualForm.class, ManualContract.NAME));
    }

    @Override
    public void process(ExecutableInject<ManualContent> injection, Execution execution) {
        throw new UnsupportedOperationException("Manual inject cannot be executed");
    }
}
