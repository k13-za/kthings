///
/// Copyright © 2016-2025 The Thingsboard Authors
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isDefinedAndNotNull } from '@core/public-api';
import { TranslateService } from '@ngx-translate/core';
import { RuleNodeConfiguration, RuleNodeConfigurationComponent } from '@app/shared/models/rule-node.models';
import { FetchTo, FetchToTranslation } from '@home/components/rule-node/rule-node-config.models';

@Component({
  selector: 'tb-transformation-node-delete-keys-config',
  templateUrl: './delete-keys-config.component.html',
  styleUrls: []
})

export class DeleteKeysConfigComponent extends RuleNodeConfigurationComponent {

  deleteKeysConfigForm: FormGroup;
  deleteFrom = [];
  translation = FetchToTranslation;

  constructor(private fb: FormBuilder,
              private translate: TranslateService) {
    super();
    for (const key of this.translation.keys()) {
      this.deleteFrom.push({
        value: key,
        name: this.translate.instant(this.translation.get(key))
      });
    }
  }

  protected onConfigurationSet(configuration: RuleNodeConfiguration) {
    this.deleteKeysConfigForm = this.fb.group({
      deleteFrom: [configuration.deleteFrom, [Validators.required]],
      keys: [configuration ? configuration.keys : null, [Validators.required]]
    });
  }

  protected prepareInputConfig(configuration: RuleNodeConfiguration): RuleNodeConfiguration {
    let deleteFrom: FetchTo;

    if (isDefinedAndNotNull(configuration?.fromMetadata)) {
      deleteFrom = configuration.fromMetadata ? FetchTo.METADATA : FetchTo.DATA;
    } else if (isDefinedAndNotNull(configuration?.deleteFrom)) {
      deleteFrom = configuration?.deleteFrom;
    } else {
      deleteFrom = FetchTo.DATA;
    }

    return {
      keys: isDefinedAndNotNull(configuration?.keys) ? configuration.keys : null,
      deleteFrom
    };
  }

  protected configForm(): FormGroup {
    return this.deleteKeysConfigForm;
  }
}
