import PhotoTag from '@/tag/PhotoTag';
import { isTagFavs } from '.';
import PhotoFavs from './PhotoFavs';
import { EntityLinkExternalProps } from '@/components/entity/EntityLink';
import { Fragment } from 'react';

export default function PhotoTags({

  tags,

  tagCounts = {},

  contrast,

  prefetch,

}: {

  tags: string[]

  tagCounts?: Record<string, number>

} & EntityLinkExternalProps) {

  return (

    <div className="flex flex-row flex-wrap gap-x-1">

      {tags.map(tag =>

        <Fragment key={tag}>

          {isTagFavs(tag)

            ? <PhotoFavs {...{

              contrast,
              prefetch,
              countOnHover: tagCounts[tag],
            }} />
            : <PhotoTag {...{
              tag,
              contrast,
              prefetch, countOnHover: tagCounts[tag]
            }} />}
        </Fragment>)}
    </div>
  );
}