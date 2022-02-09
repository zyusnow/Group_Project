"""empty message

Revision ID: b1d442c8d788
Revises: 911f73df008a
Create Date: 2022-02-08 09:23:37.485869

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b1d442c8d788'
down_revision = '911f73df008a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('categories', sa.Column('category_image', sa.String(length=255), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('categories', 'category_image')
    # ### end Alembic commands ###
